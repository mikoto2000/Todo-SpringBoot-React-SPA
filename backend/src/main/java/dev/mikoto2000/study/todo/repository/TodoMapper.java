package dev.mikoto2000.study.todo.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import dev.mikoto2000.study.todo.dto.Todo;

/**
 * TodoMapper
 */
@Mapper
public interface TodoMapper {
  @Select("SELECT id,email,title,done FROM todo WHERE email = #{email}")
  List<Todo> findAllByEmail(String email);

  @Insert("INSERT INTO todo (email,title,done) VALUES (#{email},#{title},#{done})")
  @Options(useGeneratedKeys = true, keyProperty = "id")
  void addTodo(Todo todo);
}

