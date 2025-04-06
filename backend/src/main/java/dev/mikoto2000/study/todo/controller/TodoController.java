package dev.mikoto2000.study.todo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
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
  public List<Todo> getTodos() {
    return todoMapper.findAll();
  }
}
