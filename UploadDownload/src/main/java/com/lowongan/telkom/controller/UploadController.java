/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lowongan.telkom.controller;

import com.lowongan.telkom.domain.Upload;
import com.lowongan.telkom.helper.storage.StorageFileNotFoundException;
import com.lowongan.telkom.helper.storage.StorageHelper;
import com.lowongan.telkom.service.UploadService;
import com.pariwisata.indonesia.helper.HateoasResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Irman Juliansyah <irmanjuliansyah@gmail.com>
 */
@RestController
@RequestMapping("/api")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @Autowired
    private StorageHelper storageHelper;

  

    @GetMapping(value = "/upload")
    public ResponseEntity<?> getUploads() {
        HateoasResource hateoasResource = new HateoasResource(uploadService.getUploads());
        hateoasResource.add(linkTo(methodOn(UploadController.class).getUploads()).withSelfRel());
        return new ResponseEntity<>(hateoasResource, HttpStatus.OK);

    }

    @GetMapping(value = "/upload/{idUpload}")
    public Upload getUpload(@PathVariable("idUpload") String idUpload) {

        return this.uploadService.getUpload(idUpload).orElse(null);
    }

    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<Resource> getFileImageUpload(@PathVariable String filename) {

        Resource file = storageHelper.loadAsResource(filename);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<?> save(@RequestBody Upload upload) {

        String filename = storageHelper.store(upload.getGambar());

        Upload upload1 = uploadService.save(new Upload(
                upload.getNamaUpload(),
                filename
                
        ));

        HateoasResource hateoasResource = new HateoasResource(upload1);
        hateoasResource.add(linkTo(methodOn(UploadController.class).getUpload(upload1.getIdUpload())).withSelfRel());
        return new ResponseEntity<>(hateoasResource, HttpStatus.CREATED);

    }
    
    @PutMapping(value = "/upload/{idUpload}")
    public ResponseEntity<?> update(@PathVariable("idUpload") String idUpload,
            @RequestBody Upload upload) {

        String filename = storageHelper.store(upload.getGambar());

        Upload upload1 = uploadService.update(new Upload(
                idUpload,
                upload.getNamaUpload(),
                filename
                
        ));

        HateoasResource hateoasResource = new HateoasResource(upload1);
        hateoasResource.add(linkTo(methodOn(UploadController.class).getUpload(upload1.getIdUpload())).withSelfRel());
        return new ResponseEntity<>(hateoasResource, HttpStatus.OK);

    }

    @DeleteMapping(value = "/upload/{idUpload}")
    public ResponseEntity<?> delete(@PathVariable("idUpload") String idUpload,
            @RequestBody Upload upload){
        
        uploadService.delete(idUpload);
        HateoasResource hateoasResource = new HateoasResource(null);
        return new ResponseEntity<>(hateoasResource, HttpStatus.OK);
    }
            

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity handleStorageFileNotFound(StorageFileNotFoundException storageFileNotFoundException) {
        return ResponseEntity.notFound().build();
    }

}
