package dev.mikoto2000.study.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Todo
 */
@Data
@AllArgsConstructor
public class Todo {
  private Long id;
  private String title;
  private boolean done;
}
