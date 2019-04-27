package kz.diploma.prosecurity.controller.model;


public class FileWrapper {
  public String name;
  public String id;

  public FileWrapper(String saveFile, String fileName) {
    this.id = saveFile;
    this.name = fileName;
  }

  public FileWrapper() {
  }
}