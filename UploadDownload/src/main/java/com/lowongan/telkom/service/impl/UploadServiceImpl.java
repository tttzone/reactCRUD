/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lowongan.telkom.service.impl;

import com.lowongan.telkom.domain.Upload;
import com.lowongan.telkom.repository.UploadRepository;
import com.lowongan.telkom.service.UploadService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Irman Juliansyah <irmanjuliansyah@gmail.com>
 */
@Service
@Transactional(readOnly = true)
public class UploadServiceImpl implements UploadService {

    @Autowired
    private UploadRepository uploadRepository;

    @Transactional
    @Override
    public Upload save(Upload upload) {
        return uploadRepository.save(upload);
    }

    @Transactional
    @Override
    public Upload update(Upload upload) {
        return uploadRepository.save(upload);
    }

    @Transactional
    @Override
    public void delete(String idUpload) {
        uploadRepository.delete(idUpload);
    }

    @Override
    public Optional<Upload> getUpload(String idUpload) {
        return uploadRepository.findByIdUpload(idUpload);
    }

    @Override
    public Iterable<Upload> getUploads() {
        return uploadRepository.findAll();
    }

}
