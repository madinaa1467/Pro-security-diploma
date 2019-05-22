package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.FileModel;
import kz.diploma.prosecurity.controller.register.FileRegister;
import kz.diploma.prosecurity.controller.security.PublicAccess;
import kz.diploma.prosecurity.controller.util.Controller;
import kz.diploma.prosecurity.controller.util.MimeTypeUtil;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.file_storage.FileDataReader;
import kz.greetgo.mvc.annotations.Json;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnGet;
import kz.greetgo.mvc.annotations.on_methods.OnPost;
import kz.greetgo.mvc.interfaces.RequestTunnel;

import java.io.IOException;

@Bean
@ControllerPrefix("/files")
public class FilesController implements Controller {

  public BeanGetter<FileRegister> fileRegister;

  @ToJson
  @PublicAccess
  @OnPost("/save")
  public String save(@Par("file") @Json FileModel file, @Par("isLast") boolean isLast) {
    return fileRegister.get().save(file, isLast);
  }

  @OnGet("/get")
  public void get(@Par("fileId") String fileId, RequestTunnel tunnel) throws IOException {
    FileDataReader file = fileRegister.get().getFile(fileId);
    tunnel.setResponseHeader("Content-Disposition", "attachment; filename=" + file.name());
    tunnel.setResponseContentType(MimeTypeUtil.extractMimeType(file.name()));
    tunnel.setResponseContentLength(file.dataAsArray().length);
    tunnel.getResponseOutputStream().write(file.dataAsArray());
    tunnel.flushBuffer();
  }

}
