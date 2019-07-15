package mollyh5.core.mollycelllab.dao;

import com.google.common.collect.Maps;
import mollyh5.core.common.dao.AbstractDao;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.HashMap;


@Repository
public class ShareResultDao extends AbstractDao {

    public String getShareResultUrl(String randomTitleImage, String djId) {

        String sql = "select share_result_url from t_share_result where random_title_image=:randomTitleImage and dj_id=:djId";

        try {

            HashMap<String, String> map = Maps.newHashMap();
            map.put("randomTitleImage",randomTitleImage);
            map.put("djId",djId);
            return jdbcTemplate.queryForObject(sql, new MapSqlParameterSource(map), String.class);
        } catch (EmptyResultDataAccessException ignore) {

            return null;
        } catch (DataAccessException e) {
            logger.warn("getShareResultUrl Exception, {}", e.toString());

            return null;
        }
    }


}
