/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lowongan.telkom.repository;

import com.lowongan.telkom.domain.Upload;
import java.util.Optional;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 *
 * @author Irman Juliansyah <irmanjuliansyah@gmail.com>
 */


public interface UploadRepository extends PagingAndSortingRepository<Upload, String>{
    
    Optional<Upload> findByIdUpload(String idUpload); 
}
