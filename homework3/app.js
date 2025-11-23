const { createApp } = Vue;

// Header Component
const Header = {
    template: `
        <header>
            <nav class="navbar">
                <div class="nav-left">
                    <a href="#" @click.prevent="switchPage('main')" class="logo">Home</a>
                    <a href="#" @click.prevent="switchPage('addpost')" class="nav-link">AddPost</a>
                    <a href="#" @click.prevent="switchPage('signup')" class="nav-link">Signup</a>
                </div>
                <div class="profile-wrapper">
                    <img 
                        src="res/images/profile.png" 
                        alt="Profile"
                        class="profile-pic"
                        @click="toggleDropdown"
                        id="profile-btn"
                    >
                    <div class="dropdown" :class="{ show: showDropdown }" id="profile-dropdown">
                        <div class="dropdown-header">
                            <div class="dropdown-name">User Name</div>
                            <div class="dropdown-email">user@mail.com</div>
                        </div>
                        <button class="dropdown-item" @click="switchPage('profile')">Profile</button>
                        <button class="dropdown-item" @click="switchPage('addpost')">Add Post</button>
                        <button class="dropdown-item" @click="switchPage('login')">Login</button>
                    </div>
                </div>
            </nav>
        </header>
    `,
    data() {
        return {
            showDropdown: false
        };
    },
    methods: {
        switchPage(page) {
            this.$emit('page-change', page);
            this.showDropdown = false;
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        }
    },
    mounted() {
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) {
                this.showDropdown = false;
            }
        });
    }
};

// Footer Component
const Footer = {
    template: `
        <footer>
            <p>&copy; 2025 PostIt App WAD</p>
        </footer>
    `
};

// Main Page Component
const MainPage = {
    template: `
        <div class="posts">
            <div v-for="post in posts" :key="post.id" class="post-card">
                <div class="post-header">
                    <img class="profile-pic" :src="post.authorImage" alt="Profile">
                    <div class="post-time">{{ post.date }}</div>
                </div>
                <img v-if="post.postImage" class="post-img" :src="post.postImage" alt="Post image">
                <p class="post-text">{{ post.text }}</p>
                <img src="res/images/like.png" alt="Like" class="like-icon">
            </div>
        </div>
    `,
    data() {
        return {
            posts: []
        };
    },
    async mounted() {
        await this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await fetch("res/data/posts.json");
                if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
                const data = await response.json();
                this.posts = data;
            } catch(error) {
                console.error("Error fetching posts:", error);
                this.posts = [];
            }
        }
    }
};

// Signup Page Component
const SignupPage = {
    template: `
        <div class="center-box">
            <div class="form-container" id="signup">
                <form class="login-form" @submit.prevent="handleSignup" novalidate>
                    <div class="form-row">
                        <label>Email</label>
                        <input type="email" v-model="email" placeholder="Email" required>
                    </div>
                    <div class="form-row">
                        <label>Confirm Email</label>
                        <input type="email" v-model="confirmEmail" placeholder="Confirm Email" required>
                    </div>
                    <div class="form-row">
                        <label>Password</label>
                        <input type="password" v-model="password" placeholder="Password" required>
                    </div>
                    <div class="form-row">
                        <label>Confirm Password</label>
                        <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required>
                    </div>
                    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
                    <div class="button-center">
                        <button type="submit">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''
        };
    },
    methods: {
        validatePassword(pw) {
            const errors = [];
            
            if (pw.length < 8 || pw.length >= 15) {
                errors.push("The password should be at least 8 characters and less than 15 characters");
            }
            
            if (!/^[A-Z]/.test(pw)) {
                errors.push("It should start with an uppercase alphabet");
            }
            
            if (!/[A-Z]/.test(pw)) {
                errors.push("Includes at least one uppercase alphabet character");
            }
            
            const lowers = pw.match(/[a-z]/g) || [];
            if (lowers.length < 2) {
                errors.push("Includes at least two lowercase alphabet characters");
            }
            
            if (!/\d/.test(pw)) {
                errors.push("Includes at least one numeric value");
            }
            
            if (!/_/.test(pw)) {
                errors.push('It should include the character "_"');
            }
            
            return errors;
        },
        handleSignup() {
            // Clear previous errors
            this.errorMessage = '';
            
            // Check if emails match
            if (this.email !== this.confirmEmail) {
                this.errorMessage = "Emails do not match";
                return;
            }
            
            // Check if passwords match
            if (this.password !== this.confirmPassword) {
                this.errorMessage = "Passwords do not match";
                return;
            }
            
            // Validate password
            const passwordErrors = this.validatePassword(this.password);
            if (passwordErrors.length > 0) {
                this.errorMessage = "The password is not valid - " + passwordErrors.join(", ");
                return;
            }
            
            // If everything is valid
            alert('Signup successful!');
            this.$emit('page-change', 'main');
        }
    }
};

// AddPost Page Component
const AddPostPage = {
    template: `
        <div class="center-box">
            <div class="form-container">
                <form class="addpost-form" @submit.prevent="handleAddPost">
                    <label for="postBody">Post body</label>
                    <textarea id="postBody" v-model="postBody" rows="5" cols="21" placeholder="Write your post here..."></textarea>
                    <label>Select file</label>
                    <div class="file-group">
                        <label for="file">Choose file</label>
                        <input type="file" id="file" @change="handleFileSelect">
                    </div>
                    <div class="button-row">
                        <button type="submit">Create post</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            postBody: '',
            selectedFile: null
        };
    },
    methods: {
        handleFileSelect(event) {
            this.selectedFile = event.target.files[0];
        },
        handleAddPost() {
            if (this.postBody.trim()) {
                alert('Post created successfully!');
                this.postBody = '';
                this.selectedFile = null;
                this.$emit('page-change', 'main');
            } else {
                alert('Please enter some text for your post.');
            }
        }
    }
};

// Login Page Component
const LoginPage = {
    template: `
        <div class="center-box">
            <div class="form-container" id="login">
                <h2>Welcome to PostIt</h2>
                <a class="blue-link" href="#" @click.prevent="$emit('page-change', 'signup')">Create an account</a>
                <p>or</p>
                <p>Please log in</p>
                <form class="login-form" @submit.prevent="handleLogin">
                    <input type="email" v-model="email" placeholder="Email" required><br>
                    <input type="password" v-model="password" placeholder="Password" required><br>
                    <button type="submit">Log in</button>
                </form>
                <a class="blue-link" href="#">Forgot password?</a>
            </div>
        </div>
    `,
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        handleLogin() {
            // Simple login validation
            if (this.email && this.password) {
                alert('Login successful!');
                this.$emit('page-change', 'main');
            } else {
                alert('Please fill in all fields.');
            }
        }
    }
};

// Main App
const app = createApp({
    data() {
        return {
            currentPage: 'main'
        };
    },
    components: {
        'app-header': Header,
        'app-footer': Footer,
        'main-page': MainPage,
        'signup-page': SignupPage,
        'addpost-page': AddPostPage,
        'login-page': LoginPage
    },
    methods: {
        switchPage(page) {
            this.currentPage = page;
        }
    },
    template: `
        <div>
            <app-header @page-change="switchPage"></app-header>
            
            <main>
                <main-page v-if="currentPage === 'main'"></main-page>
                <signup-page v-if="currentPage === 'signup'" @page-change="switchPage"></signup-page>
                <addpost-page v-if="currentPage === 'addpost'" @page-change="switchPage"></addpost-page>
                <login-page v-if="currentPage === 'login'" @page-change="switchPage"></login-page>
            </main>
            
            <app-footer></app-footer>
        </div>
    `
});

app.mount('#app');