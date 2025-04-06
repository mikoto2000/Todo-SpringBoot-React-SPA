package dev.mikoto2000.study.todo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.mikoto2000.study.todo.dto.Todo;

/**
 * TodoController
 */
@RestController
public class TodoController {

  @GetMapping("/todos")
  public List<Todo> getTodos() {
    return List.of(
        new Todo(1L, "Todo 1", false),
        new Todo(2L, "Todo 2", true),
        new Todo(3L, "Todo 3", true));
  }
}
