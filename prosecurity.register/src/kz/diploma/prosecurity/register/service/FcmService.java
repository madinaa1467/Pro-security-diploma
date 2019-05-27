package kz.diploma.prosecurity.register.service;

import java.util.Map;
import java.util.concurrent.ExecutionException;

public interface FcmService {

  void sendToParent(String token, Map<String, String> data) throws ExecutionException, InterruptedException;

}
