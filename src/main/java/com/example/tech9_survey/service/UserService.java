package com.example.tech9_survey.service;

import com.example.tech9_survey.domain.UserRole;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.domain.UserStatus;
import com.example.tech9_survey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public User findOne(Long userId) {
		return userRepository.findOne(userId);
	}
    
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public void delete(Long id) {
        userRepository.delete(id);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);

        if (!user.getIsEnabled()) {
            return org.springframework.security.core.userdetails.User.withUsername(user.getUsername()).password(user.getPassword())
                    .disabled(true).roles(getAuthorities(user).toString())
                    .build();
        }

        if (user.getUserStatus().getType().equals(UserStatus.UserStatusType.STATUS_INACTIVE)) {
            return org.springframework.security.core.userdetails.User.withUsername(user.getUsername()).password(user.getPassword())
                    .accountLocked(true).roles(getAuthorities(user).toString())
                    .build();
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthorities(user));
    }

    private Set<GrantedAuthority> getAuthorities(User user){
        Set<GrantedAuthority> authorities = new HashSet<>();
        
        for(UserRole role : user.getRoles()) {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getType().toString());
            authorities.add(grantedAuthority);
        }
        
        return authorities;
    }
    
    public User getLoggedInUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserUsername = auth.getName();
        User user = findByUsername(loggedInUserUsername);
        
        if(user == null) {
        	return null;
        }
        else
        {
        	return user;
        }
    }
}
