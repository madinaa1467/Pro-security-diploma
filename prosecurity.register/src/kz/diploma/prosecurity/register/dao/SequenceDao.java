package kz.diploma.prosecurity.register.dao;

import org.apache.ibatis.annotations.Select;

public interface SequenceDao {

  @Select("select nextval('pro_seq')")
  Long proSeqNext();
}
