package pe.edu.hackathon.ms_students.domain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("student")
public class Student {
    @Id
    @Column("id")
    private Long id;

    @Column("first_name")
    private String firstName;

    @Column("last_name")
    private String lastName;
    
    @Column("promotion")
    private Integer promotion;

    @Column("date")
    private LocalDate date;

    @Column("active")
    private Boolean active;
}
