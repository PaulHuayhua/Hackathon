package vg.paul.huayhua.hackathon.service;

import java.util.List;

import vg.paul.huayhua.hackathon.model.Student;

public interface StudentService {
    List<Student> findAll();

    Student findById(Long id);

    List<Student> findByAcademicProgram(String academicProgram);

    List<Student> findByAcademicCycle(Integer academicCycle);

    List<Student> findByState(Boolean state);

    List<Student> findByDepartment(String department);

    List<Student> findByProvince(String province);

    List<Student> findByDistrict(String district);

    List<String> findAllDepartments();

    List<String> findProvincesByDepartment(String department);

    List<String> findDistrictsByDeptAndProv(String department, String province);

    Student save(Student student);

    Student update(Student student);

    Student deleteById(Long id);

    Student restore(Long id);

    byte[] generateJasperPdfReport() throws Exception;
}
