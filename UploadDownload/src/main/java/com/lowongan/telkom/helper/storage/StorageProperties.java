package com.lowongan.telkom.helper.storage;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 *
 * @author Irman Juliansyah <irmanjuliansyah@gmail.com>
 */
@ConfigurationProperties("storage")
public class StorageProperties {

    @Getter
    @Setter
    private String location = "upload-dir";
}
