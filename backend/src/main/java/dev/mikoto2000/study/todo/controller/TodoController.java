package dev.mikoto2000.study.todo.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.mikoto2000.study.todo.dto.Todo;
import dev.mikoto2000.study.todo.repository.TodoMapper;
import lombok.RequiredArgsConstructor;

/**
 * TodoController
 */
@RestController
@RequiredArgsConstructor
public class TodoController {

  private final TodoMapper todoMapper;

  @GetMapping("/todos")
  public List<Todo> getTodos(
      @AuthenticationPrincipal Jwt jwt,
      @RequestParam(defaultValue = "20") int size,
      @RequestParam(defaultValue = "0") int page) {

    int offset = size * page;
    int limit = size;

    return todoMapper.findAllByEmail(jwt.getClaimAsString("email"), offset, limit);
  }

  @PostMapping("/todos")
  public Todo addTodo(
      @AuthenticationPrincipal Jwt jwt,
      @RequestBody Todo todo) {

    todo.setEmail(jwt.getClaimAsString("email"));
    todoMapper.addTodo(todo);

    return todo;
  }
}
