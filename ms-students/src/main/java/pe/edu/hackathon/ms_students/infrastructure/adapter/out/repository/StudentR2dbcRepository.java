package pe.edu.hackathon.ms_students.infrastructure.adapter.out.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import pe.edu.hackathon.ms_students.domain.model.Student;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentR2dbcRepository extends ReactiveCrudRepository<Student, Long> {
    
}
