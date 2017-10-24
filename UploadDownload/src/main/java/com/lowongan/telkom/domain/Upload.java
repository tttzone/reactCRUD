/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lowongan.telkom.domain;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author Irman Juliansyah <irmanjuliansyah@gmail.com>
 */
@Entity
@Table(name = "tb_upload")
public class Upload implements Serializable {

    public Upload() {
    }

    public Upload(String namaUpload, String gambar) {
        this.namaUpload = namaUpload;
        this.gambar = gambar;
    }

    public Upload(String idUpload, String namaUpload, String gambar) {
        this.idUpload = idUpload;
        this.namaUpload = namaUpload;
        this.gambar = gambar;
    }

    @Id
    @Getter
    @Setter
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String idUpload;

    @Getter
    @Setter
    @Column(name = "namaUpload", length = 100)
    private String namaUpload;

    @Getter
    @Setter
    @Column(name = "gambar", length = 100)
    private String gambar;

}
