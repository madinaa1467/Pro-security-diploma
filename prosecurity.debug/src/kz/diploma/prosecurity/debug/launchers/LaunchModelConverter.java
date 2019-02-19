package kz.diploma.prosecurity.debug.launchers;

import kz.diploma.prosecurity.controller.util.Modules;
import kz.greetgo.ts_java_convert.ConvertModelBuilder;

import java.io.File;

public class LaunchModelConverter {
  public static void main(String[] args) throws Exception {
    File sourceDir = Modules.clientDir().toPath()
      .resolve("src").toFile();
    File destinationDir = Modules.controllerDir().toPath()
      .resolve("src").toFile();
    String destinationPackage = "kz.diploma.prosecurity.controller.model";

    new ConvertModelBuilder()
      .sourceDir(sourceDir, "model")
      .destinationDir(destinationDir)
      .destinationPackage(destinationPackage)
      .create().execute();
  }
}
