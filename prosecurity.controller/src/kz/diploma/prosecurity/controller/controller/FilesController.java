package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.FileModel;
import kz.diploma.prosecurity.controller.register.FileRegister;
import kz.diploma.prosecurity.controller.security.PublicAccess;
import kz.diploma.prosecurity.controller.util.Controller;
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
import kz.greetgo.mvc.util.MimeUtil;

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

  /*@ToJson
  @OnPost("/save")
  public FileWrapper save(@Par("fileData") Upload file) throws IOException {


    FileHolder fileHolder = new FileHolder();

    fileHolder.name = file.getSubmittedFileName();
    fileHolder.data = new byte[file.getInputStream().available()];
    int read = file.getInputStream().read(fileHolder.data);
    assert read == fileHolder.data.length;
    fileHolder.contentType = file.getContentType();

    return new FileWrapper(fileRegister.get().saveFile(fileHolder), file.getSubmittedFileName());

  }*/


  /*@ToJson
  @PublicAccess
  @OnGet("/get")
  public void get(@Par("fileId") String fileId, BinResponse binResponse) throws IOException {

    FileDataReader file = fileRegister.get().getFile(fileId);
    if (file == null) throw new RestError("Could not find fileId: " + fileId);
    binResponse.setFilename(file.name());
    binResponse.setContentTypeByFilenameExtension();
    binResponse.out().write(file.dataAsArray());
    binResponse.flushBuffers();
  }*/

  @PublicAccess
  @OnGet("/get")
  public void get(@Par("fileId") String fileId, RequestTunnel tunnel) throws IOException {
    FileDataReader file = fileRegister.get().getFile(fileId);
    tunnel.setResponseHeader("Content-Disposition", "attachment; filename=" + file.name());
    tunnel.setResponseContentType(MimeUtil.mimeTypeFromFilename(file.name()));
    tunnel.setResponseContentLength(file.dataAsArray().length);
    tunnel.getResponseOutputStream().write(file.dataAsArray());
    tunnel.flushBuffer();
  }

}
