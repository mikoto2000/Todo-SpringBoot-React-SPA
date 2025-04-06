package dev.mikoto2000.study.todo.repository;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import dev.mikoto2000.study.todo.dto.Todo;

/**
 * TodoMapper
 */
@Mapper
public interface TodoMapper {
  @Select("SELECT id,email,title,done FROM todo WHERE email = #{email} ORDER BY done ASC, id DESC LIMIT #{limit} OFFSET #{offset}")
  List<Todo> findAllByEmail(String email, int offset, int limit);

  @Insert("INSERT INTO todo (email,title,done) VALUES (#{email},#{title},#{done})")
  @Options(useGeneratedKeys = true, keyProperty = "id")
  void addTodo(Todo todo);

  @Update("UPDATE todo SET title = #{title}, done = #{done} WHERE id = #{id} AND email = #{email}")
  void updateTodo(Todo todo);

  @Delete("DELETE FROM todo WHERE id = #{id} AND email = #{email}")
  void deleteTodoByIdAndEmail(Long id, String email);
}

