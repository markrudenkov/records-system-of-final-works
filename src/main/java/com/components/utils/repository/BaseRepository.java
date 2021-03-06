package com.components.utils.repository;

import com.components.defence.repository.model.DefenceDb;
import com.components.utils.repository.model.DbModel;
import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.springframework.jdbc.core.RowMapper;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


public abstract class BaseRepository<E extends DbModel> extends JdbcRepository<E, Long> {

    public BaseRepository(
            RowMapper<E> rowMapper,
            RowUnmapper<E> rowUnmapper,
            String tableName,
            String idColumn) {
        super(rowMapper, rowUnmapper, tableName, idColumn);
    }

    @Override
    protected <S extends E> S postCreate(S entity, Number generatedId) {
        if (generatedId != null) {
            entity.setId(generatedId.longValue());
        }
        return entity;
    }

    protected static Map<String, Object> mapOf(Object... values) {
        Map<String, Object> map = new HashMap<>();
        for (int i = 0; i < values.length - 1; i+=2) {
            map.put(values[i].toString(), values[i+1]);
        }
        return Collections.unmodifiableMap(map);
    }



}
