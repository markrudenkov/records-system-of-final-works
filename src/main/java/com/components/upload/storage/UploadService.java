package com.components.upload.storage;

import com.components.final_work.repository.FinalWorkRepository;
import com.components.final_work.service.FinalWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UploadService {

    @Autowired
    FinalWorkRepository finalWorkRepository;

    public String updateFilePath(Long finalWorkId, String filePath){
        finalWorkRepository.updateFinalWorkFileParth(filePath, finalWorkId);
        return filePath;
    }
}
