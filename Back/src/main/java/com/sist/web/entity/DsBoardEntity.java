package com.sist.web.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.Data;

//	Columns:
//	no int AI PK
//	user_id varchar(50)
//	subject varchar(1000)
//	content text
//	pwd varchar(10)
//	regdate datetime
//	hit int
@Entity(name = "DSBoard")
@Data
public class DsBoardEntity {
    @Id
    private int no;

    private int hit;

    private String name, subject, content;

    @Column(insertable = true, updatable = false)
    private String pwd;

    @Column(insertable = true, updatable = false)
    private String regdate;

    @PrePersist
    public void regdate() {
        this.regdate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}