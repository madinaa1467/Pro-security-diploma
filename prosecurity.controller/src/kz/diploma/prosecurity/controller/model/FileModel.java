package kz.diploma.prosecurity.controller.model;

public class FileModel {
  public String id;
  public String name;
  public String type;
  public String src;

  public FileModel() {
  }

  public FileModel(String id, String name, String type, String src) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.src = src;
  }
}
