package vg.paul.huayhua.hackathon.repository;

import vg.paul.huayhua.hackathon.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Filtros directos por campos
    List<Student> findByAcademicProgram(String academicProgram);
    List<Student> findByAcademicCycle(Integer academicCycle);
    List<Student> findByState(Boolean state);

    List<Student> findByDepartment(String department);
    List<Student> findByProvince(String province);
    List<Student> findByDistrict(String district);

    @Query("SELECT DISTINCT s.department FROM Student s ORDER BY s.department")
    List<String> findAllDepartments();

    @Query("SELECT DISTINCT s.province FROM Student s WHERE s.department = :department ORDER BY s.province")
    List<String> findProvincesByDepartment(@Param("department") String department);

    @Query("SELECT DISTINCT s.district FROM Student s WHERE s.department = :department AND s.province = :province ORDER BY s.district")
    List<String> findDistrictsByDeptAndProv(@Param("department") String department, @Param("province") String province);
}
