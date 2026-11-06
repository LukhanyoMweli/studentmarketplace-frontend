const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };

export const MailIcon = () => (
    <svg {...base}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
);
export const LockIcon = () => (
    <svg {...base}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const UserIcon = () => (
    <svg {...base}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" /></svg>
);
export const PhoneIcon = () => (
    <svg {...base}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
);
export const CapIcon = () => (
    <svg {...base}><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></svg>
);
export const EyeIcon = () => (
    <svg {...base}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const EyeOffIcon = () => (
    <svg {...base}>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <path d="M1 1l22 22M6.1 6.1A18.5 18.5 0 0 0 1 12s4 8 11 8a9.3 9.3 0 0 0 5.4-1.6" />
    </svg>
);
export const BagIcon = () => (
    <svg {...base}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
);
export const ShieldIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 4 5v6c0 5.5 3.5 10.3 8 11 4.5-.7 8-5.5 8-11V5l-8-3Zm-1.2 13.2L7 11.4l1.4-1.4 2.4 2.4 5-5L17.2 9l-6.4 6.2Z" />
    </svg>
);
export const ShieldCheckIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5.5 3.5 10.3 8 11 4.5-.7 8-5.5 8-11V5l-8-3Z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" />
    </svg>
);
export const LogoIcon = () => (
    <svg width="46" height="50" viewBox="0 0 48 52" aria-hidden="true">
        <path d="M16 17v-4a8 8 0 0 1 16 0v4" fill="none" stroke="#0e8a99" strokeWidth="3" strokeLinecap="round" />
        <path d="M8 17h32l-2 32H10z" fill="#0e8a99" />
        <path d="M24 26 7 33.5l17 7.5 17-7.5z" fill="#0b1f3a" />
        <path d="M14 38v5c0 2.2 4.5 4 10 4s10-1.8 10-4v-5l-10 4.5z" fill="#0b1f3a" />
    </svg>
);
export const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.5-4.2 7-10.3 7-17.6z" />
        <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z" />
        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
);