package pe.edu.hackathon.ms_students.infrastructure.adapter.out;

import org.springframework.stereotype.Repository;

import pe.edu.hackathon.ms_students.application.port.out.StudentRepository;
import pe.edu.hackathon.ms_students.domain.model.Student;
import pe.edu.hackathon.ms_students.infrastructure.adapter.out.repository.StudentR2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public class StudentRepositoryAdapter implements StudentRepository {

    private final StudentR2dbcRepository studentR2dbcRepository;

    public StudentRepositoryAdapter(StudentR2dbcRepository studentR2dbcRepository) {
        this.studentR2dbcRepository = studentR2dbcRepository;
    }

    @Override
    public Flux<Student> findAll() {
        return studentR2dbcRepository.findAll();
    }

    @Override
    public Mono<Student> findById(Long id) {
        return studentR2dbcRepository.findById(id);
    }

    @Override
    public Mono<Student> save(Student student) {
        return studentR2dbcRepository.save(student);
    }

}
