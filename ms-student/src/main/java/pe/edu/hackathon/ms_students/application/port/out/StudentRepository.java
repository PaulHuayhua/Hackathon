package pe.edu.hackathon.ms_students.application.port.out;

import pe.edu.hackathon.ms_students.domain.model.Student;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

public interface StudentRepository {
    Flux<Student> findAll();
    Mono<Student> findById(Long id);
    Mono<Student> save(Student student);
    
}
