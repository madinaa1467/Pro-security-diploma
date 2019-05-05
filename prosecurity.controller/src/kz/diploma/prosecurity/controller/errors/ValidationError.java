package kz.diploma.prosecurity.controller.errors;

import java.util.Arrays;
import java.util.List;

public class ValidationError extends  JsonRestError {

  public ValidationError(List<ErrorMessage> errors) {
    super(400, errors);
  }

  public ValidationError(ErrorMessage... errors) {
    super(400, Arrays.asList(errors));
  }
}
