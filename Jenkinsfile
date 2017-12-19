pipeline {
    agent any
    environment {
        CI = 'true' 
    }
    stages {
        stage ('Check environment') {
            steps {
                sh """
                    node --version
                    npm --version
                    git --version
                """
            }
        }
        stage('Install') { 
            steps {
                sh 'npm install'
                sh 'cd src/'
                sh 'npm install'
                sh 'cd ..'
                sh 'cd u/i'
                sh 'npm install'
                sh 'cd ..'
            }
        }
        stage('Start mongodb') { 
            steps {
                sh 'mongod --fork --logpath /var/log/mongod.log'
            }
        }
        stage('Unit test') {
            steps {
                sh 'cd src/'
                script {
                    def testOut = sh(script: """
                    Xvfb :99 -screen 0 1024x768x16 &> xvfb.log &
                    export DISPLAY=:99.0
                    ps -ea
                    npm run test
                    """, returnStdout: true).trim()
                    // writeFile(file: 'coverage.txt', text: testOut)
                    // publishHTML (target: [
                    //     allowMissing: false,
                    //     alwaysLinkToLastBuild: false,
                    //     keepAll: true,
                    //     reportDir: "coverage",
                    //     reportFiles: "index.html",
                    //     reportName: "Code coverage report"
                    // ])
                }
            }
        }
        stage('Stop mongodb') { 
            steps {
                sh 'mongod --shutdown'
            }
        }
    }
}
