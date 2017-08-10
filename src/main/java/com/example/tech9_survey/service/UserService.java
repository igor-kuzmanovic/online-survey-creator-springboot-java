package com.example.tech9_survey.service;

import com.example.tech9_survey.common.UserDto;
import com.example.tech9_survey.domain.Role;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.repository.UserRepository;
import org.jtransfo.JTransfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private JTransfo jTransfo;

    @Autowired
    public UserService(UserRepository userRepository, JTransfo jTransfo) {
        this.userRepository = userRepository;
        this.jTransfo = jTransfo;
    }

    public UserDto findByUsername(String username) {
        return jTransfo.convertTo(userRepository.findByUsername(username), UserDto.class);
    }

    public List<UserDto> findAll() {
        return jTransfo.convertList(userRepository.findAll(), UserDto.class);
    }

    public UserDto save(UserDto userDto) {
        User user = jTransfo.convertTo(userDto, User.class);

        return jTransfo.convertTo(userRepository.save(user), UserDto.class);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found!");
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthorities(user));
    }

    private Set<GrantedAuthority> getAuthorities(UserDto user){
        Set<GrantedAuthority> authorities = new HashSet<>();
        for(Role role : user.getRoles()) {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getType().toString());
            authorities.add(grantedAuthority);
        }
        return authorities;
    }
}
