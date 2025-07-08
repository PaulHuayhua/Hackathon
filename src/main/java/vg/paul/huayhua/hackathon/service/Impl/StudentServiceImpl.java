package vg.paul.huayhua.hackathon.service.Impl;

import java.util.List;
import java.io.InputStream;
import java.util.HashMap;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperExportManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.sql.DataSource;

import vg.paul.huayhua.hackathon.model.Student;
import vg.paul.huayhua.hackathon.repository.StudentRepository;
import vg.paul.huayhua.hackathon.service.StudentService;
import org.springframework.core.io.ClassPathResource;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    private DataSource dataSource;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student findById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Student> findByAcademicProgram(String academicProgram) {
        return studentRepository.findByAcademicProgram(academicProgram);
    }

    @Override
    public List<Student> findByAcademicCycle(Integer academicCycle) {
        return studentRepository.findByAcademicCycle(academicCycle);
    }

    @Override
    public List<Student> findByState(Boolean state) {
        return studentRepository.findByState(state);
    }

    @Override
    public List<Student> findByDepartment(String department) {
        return studentRepository.findByDepartment(department);
    }

    @Override
    public List<Student> findByProvince(String province) {
        return studentRepository.findByProvince(province);
    }

    @Override
    public List<Student> findByDistrict(String district) {
        return studentRepository.findByDistrict(district);
    }

    @Override
    public List<String> findAllDepartments() {
        return studentRepository.findAllDepartments();
    }

    @Override
    public List<String> findProvincesByDepartment(String department) {
        return studentRepository.findProvincesByDepartment(department);
    }

    @Override
    public List<String> findDistrictsByDeptAndProv(String department, String province) {
        return studentRepository.findDistrictsByDeptAndProv(department, province);
    }

    @Override
    public Student save(Student student) {
        student.setState(true);

        // Obtener el último código asignado
        List<Student> students = studentRepository.findAll();
        String lastCode = students.stream()
                .map(Student::getCode)
                .filter(code -> code != null && code.matches("A\\d{3}"))
                .max(String::compareTo)
                .orElse("A000");

        // Incrementar el número
        int nextNumber = Integer.parseInt(lastCode.substring(1)) + 1;
        String nextCode = String.format("A%03d", nextNumber);

        student.setCode(nextCode);

        return studentRepository.save(student);
    }

    @Override
    public Student update(Student student) {
        student.setState(true); // Asegura que se actualiza como activo
        return studentRepository.save(student);
    }

    @Override
    public Student deleteById(Long id) {
        Student student = findById(id);
        if (student != null) {
            student.setState(false); // Eliminación lógica
            return studentRepository.save(student);
        }
        return null;
    }

    @Override
    public Student restore(Long id) {
        Student student = findById(id);
        if (student != null) {
            student.setState(true); // Restauración lógica
            return studentRepository.save(student);
        }
        return null;
    }

    @Override
    public byte[] generateJasperPdfReport() throws Exception {
        InputStream jasperStream = new ClassPathResource("reports/estudiantes.jasper").getInputStream();
        HashMap<String, Object> params = new HashMap<>();
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperStream, params, dataSource.getConnection());
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}
