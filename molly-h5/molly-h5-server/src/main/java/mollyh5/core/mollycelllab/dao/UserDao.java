package mollyh5.core.mollycelllab.dao;

import mollyh5.core.common.dao.AbstractDao;
import mollyh5.core.common.dto.UserDto;
import mollyh5.core.mollycelllab.po.User;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public class UserDao extends AbstractDao {

    private static final String SQL_INSERT = "insert into t_mcl_user " +
            "(open_id,status,updated_at)" +
            " values " +
            "(:openId,:status,:updatedAt)";

    private static final String SQL_UPDATE = "update t_mcl_user set " +
            " status=:status,updated_at=:updatedAt,submit_count=:submitCount,dj_id=:djId" +
            " where open_id=:openId";

    private static final String SQL_GETUSERDTO = "select status,dj_id,submit_count from t_mcl_user where open_id=:openId";


    public boolean exists(String openId) {
        return count("select count(*) from t_mcl_user where open_id=:openId",
                new MapSqlParameterSource("openId", openId),
                "Status.exists") > 0;
    }

    public void insert(User status) {
        status.setUpdatedAt(LocalDateTime.now());

        jdbcTemplate.update(SQL_INSERT, new BeanPropertySqlParameterSource(status));
    }

    public void update(User status) {
        status.setUpdatedAt(LocalDateTime.now());

        jdbcTemplate.update(SQL_UPDATE, new BeanPropertySqlParameterSource(status));
    }

    public UserDto getUserDto(String openId) {

        try {
            return queryForObject(SQL_GETUSERDTO, new MapSqlParameterSource("openId", openId), (rs, rowNum) -> {
                UserDto dto = new UserDto();
                dto.setStatus(rs.getInt("status"));
                dto.setDjId(rs.getInt("dj_id"));
                dto.setSubmitCount(rs.getInt("submit_count"));
                return dto;
            }, "return UserDto");
        } catch (EmptyResultDataAccessException ignore) {
            return null;
        } catch (DataAccessException e) {
            logger.warn("return UserDto Exception, {}", e.toString());

            return null;
        }
    }
}
