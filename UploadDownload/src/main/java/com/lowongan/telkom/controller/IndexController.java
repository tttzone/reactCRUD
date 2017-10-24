/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lowongan.telkom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author Irman Juliansyah <irmanjuliansyah@gmail.com>
 */

@Controller
public class IndexController {

    @GetMapping(value = "/")
    public String index() {
        return "index";
    }
}
