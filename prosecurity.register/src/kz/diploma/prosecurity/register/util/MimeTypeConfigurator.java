package kz.diploma.prosecurity.register.util;

import kz.greetgo.file_storage.impl.FileStorageBuilder;
import kz.greetgo.file_storage.impl.FileStorageBuilderConfigurator;

public class MimeTypeConfigurator implements FileStorageBuilderConfigurator {

  enum Ins {
    VALUE;

    final MimeTypeConfigurator instance = new MimeTypeConfigurator();
  }

  public static MimeTypeConfigurator get() {
    return MimeTypeConfigurator.Ins.VALUE.instance;
  }

  private MimeTypeConfigurator() {}

  @Override
  public void configure(FileStorageBuilder fileStorageBuilder) {
    fileStorageBuilder.mimeTypeExtractor(MimeTypeUtil::extractMimeType);
    fileStorageBuilder.mimeTypeValidator(MimeTypeUtil::validator);
  }
}
