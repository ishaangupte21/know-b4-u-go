package com.ishaan.api.countries;


import lombok.Data;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "rss")
@Data
@XmlAccessorType(XmlAccessType.FIELD)
public class CountryResponse {
    @XmlElement(name = "channel")
    private CountryChannel channel;

    public CountryResponse() {
    }
}
