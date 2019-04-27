package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.FileHolder;
import kz.diploma.prosecurity.controller.model.FileWrapper;
import kz.diploma.prosecurity.controller.register.FileRegister;
import kz.diploma.prosecurity.controller.util.Controller;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.file_storage.FileDataReader;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnGet;
import kz.greetgo.mvc.annotations.on_methods.OnPost;
import kz.greetgo.mvc.interfaces.RequestTunnel;
import kz.greetgo.mvc.interfaces.Upload;

import java.io.IOException;

@Bean
@ControllerPrefix("/files")
public class FilesController implements Controller {

  public BeanGetter<FileRegister> fileRegister;

  @ToJson
  @OnPost("/save")
  public FileWrapper save(@Par("fileData") Upload file) throws IOException {


    FileHolder fileHolder = new FileHolder();

    fileHolder.name = file.getSubmittedFileName();
    fileHolder.data = new byte[file.getInputStream().available()];
    int read = file.getInputStream().read(fileHolder.data);
    assert read == fileHolder.data.length;
    fileHolder.contentType = file.getContentType();

    return new FileWrapper(fileRegister.get().saveFile(fileHolder), file.getSubmittedFileName());

  }

  @ToJson
  @OnGet("/get")
  public void get(@Par("fileId") String fileId, RequestTunnel tunnel) throws IOException {
    FileDataReader file = fileRegister.get().getFile(fileId);
    tunnel.setResponseHeader("Content-Disposition", "attachment; filename=" + file.name());
    tunnel.setResponseContentLength(file.dataAsArray().length);
    tunnel.getResponseOutputStream().write(file.dataAsArray());
    tunnel.flushBuffer();
  }

}
