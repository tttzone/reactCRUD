/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lowongan.telkom.service;

import com.lowongan.telkom.domain.Upload;
import java.util.Optional;

/**
 *
 * @author Irman Juliansyah <irmanjuliansyah@gmail.com>
 */
public interface UploadService {
    
    Upload save (Upload upload);
    
    Upload update (Upload upload);
    
    public void delete (String idUpload);
    
    Optional<Upload> getUpload(String idUpload);
    
    Iterable<Upload> getUploads();
}
