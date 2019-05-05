package kz.diploma.prosecurity.register.sql;

/**
 * Предоставляет возможность формирования SQL
 * 
 * <p>
 * Позволяет указывать различные части SQL-я в различных последовательностях
 * </p>
 * 
 * @author pompei
 */
public class SQL extends AbstractSQL<SQL> {
  
  @Override
  public SQL getSelf() {
    return this;
  }
  
  @Override
  protected SQL createNew() {
    return new SQL();
  }
  
}
