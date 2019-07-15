package mollyh5.core.common.dao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

public abstract class AbstractDao {
    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    protected NamedParameterJdbcTemplate jdbcTemplate;

    protected static int columnIndex(ResultSet rs, String columnLabel) {
        try {
            return rs.findColumn(columnLabel);
        } catch (SQLException ignored) {
            return -1;
        }
    }

    protected long count(String sql,
                         SqlParameterSource paramSource,
                         String method) {
        try {
            Long c = jdbcTemplate.queryForObject(sql, paramSource, Long.class);
            if (c == null) {
                return 0;
            } else {
                return c;
            }
        } catch (DataAccessException e) {
            logger.warn("{} Exception, {}", method, e.toString());

            return 0;
        }
    }

    protected <T> List<T> queryForList(String sql,
                                       SqlParameterSource paramSource,
                                       RowMapper<T> rowMapper,
                                       String method) {
        try {
            return jdbcTemplate.query(sql, paramSource, rowMapper);
        } catch (DataAccessException e) {
            logger.warn("{} Exception, {}", method, e.toString());

            return Collections.emptyList();
        }
    }

    protected <T> T queryForObject(String sql, SqlParameterSource paramSource, RowMapper<T> rowMapper, String method) {
        try {
            return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
        } catch (EmptyResultDataAccessException ignore) {
            return null;
        } catch (DataAccessException e) {
            logger.warn("{} Exception, {}", method, e.toString());

            return null;
        }
    }
}
