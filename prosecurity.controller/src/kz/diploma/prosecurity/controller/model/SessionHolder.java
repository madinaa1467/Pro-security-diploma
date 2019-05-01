package kz.diploma.prosecurity.controller.model;

import java.io.Serializable;

public class SessionHolder implements Serializable {
  public final long parentId;
  public final String mode;

  public SessionHolder(long parentId, String mode) {
    this.parentId = parentId;
    this.mode = mode;
  }
}
