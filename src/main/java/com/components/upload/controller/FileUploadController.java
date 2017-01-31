package com.components.upload.controller;

import com.components.upload.storage.StorageFileNotFoundException;
import com.components.upload.storage.StorageService;
import com.components.upload.storage.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileUploadController {

    @Autowired
    UploadService uploadService;

    private final StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }



    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity
                .ok()
                /*.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+file.getFilename()+"\"")*/
                .body(file);
    }


    @PostMapping("/api/student/finalwork/upload/{id}")
    public String handleFileUpload(@PathVariable Long id, @RequestParam("file") MultipartFile file) {

        storageService.store(file);
        uploadService.updateFilePath(id,file.getOriginalFilename());
        file.getOriginalFilename();
        return "{\"Message\":\"Uploaded\"}";
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
