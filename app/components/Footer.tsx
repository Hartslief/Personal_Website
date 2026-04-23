export default function Footer() {
    return (
        <footer className="relative w-full z-10 bg-[#080808] text-[#444] text-center py-8 border-t border-[#1a1a1a] font-mono text-xs">
            Designed & built by{" "}
            <span className="text-pop1">Caleb Hartslief</span> ·{" "}
            {new Date().getFullYear()}
        </footer>
    );
}
