package pe.edu.hackathon.ms_students.application.port.in;

import pe.edu.hackathon.ms_students.domain.model.Student;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface StudentUseCase {
    Flux<Student> findAll();
    Mono<Student> findById(Long id);
    Mono<Student> save(Student student);
    Mono<Student> update(Student student);
    Mono<Student> deactivate(Long id);
    Mono<Student> activate(Long id);
}
