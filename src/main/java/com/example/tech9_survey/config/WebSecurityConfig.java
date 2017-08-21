package com.example.tech9_survey.config;

import com.example.tech9_survey.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configurable
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http       	
        	.authorizeRequests().antMatchers("/", "/api/users", "/api/users/captchaResponse/*", "/api/users/activate/*", "/api/survey/*", "/bower_components/**", "/css/**", "/js/**", "/views/**", "/images/**").permitAll().and()
        	.authorizeRequests().antMatchers("/**").authenticated().and()
	        .httpBasic().and()	
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()        	
	        .csrf().disable();        	  		
    }
}
