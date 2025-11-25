import React, { useState, useRef, useEffect, memo } from 'react';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Upload, 
  MessageSquare, 
  Heart, 
  ChevronRight,
  Sparkles,
  Star,
  CheckCircle,
  Clock,
  ShieldCheck,
  Truck,
  Baby,
  Stethoscope,
  ShoppingBag,
  Smile,
  Navigation,
  Loader,
  Instagram,
  Facebook
} from 'lucide-react';
import { Testimonial } from './types';
import { TESTIMONIALS, WHATSAPP_NUMBER } from './constants';


// --- Helpers ---

const openWhatsApp = (message: string = "") => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// --- Sub-Components ---

const BrandLogo = ({ 
  variant = 'color', 
  className = "h-12",
  withLoadingAnimation = false 
}: { 
  variant?: 'color' | 'white', 
  className?: string,
  withLoadingAnimation?: boolean 
}) => {
  const textColorSecondary = variant === 'color' ? '#005CB9' : '#FFFFFF'; 
  const loaderColor = variant === 'color' ? 'text-brand-red' : 'text-white';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Símbolo Gráfico - Cruz/Coração */}
        <svg viewBox="0 0 100 100" className="h-full w-auto aspect-square overflow-visible group-hover:scale-105 transition-transform duration-300 ease-in-out">
          <g stroke={variant === 'color' ? "#FFD100" : "transparent"} strokeWidth="3" strokeLinejoin="round">
            <path d="M50 50 L50 25 A 15 15 0 0 0 20 25 A 15 15 0 0 0 20 50 L50 50" fill={variant === 'color' ? "#005CB9" : "#FFFFFF"} />
            <path d="M50 50 L80 50 A 15 15 0 0 0 80 20 L50 20 Z" fill={variant === 'color' ? "#008F39" : "#FFFFFF"} className={variant === 'white' ? "opacity-80" : ""} />
             <rect x="50" y="20" width="30" height="30" rx="15" fill={variant === 'color' ? "#008F39" : "#FFFFFF"} className={variant === 'white' ? "opacity-80" : ""} />
             <rect x="20" y="50" width="30" height="30" rx="15" fill={variant === 'color' ? "#008F39" : "#FFFFFF"} className={variant === 'white' ? "opacity-60" : ""} />
            <path d="M 50 50 L 20 50 L 20 35 C 20 20 35 15 42 20 C 47 23 50 30 50 35 Z" fill={variant === 'color' ? "#005CB9" : "#FFFFFF"} />
            <circle cx="35" cy="35" r="15" fill={variant === 'color' ? "#005CB9" : "#FFFFFF"} />
            <rect x="20" y="35" width="30" height="15" fill={variant === 'color' ? "#005CB9" : "#FFFFFF"} />
            <rect x="35" y="20" width="15" height="30" fill={variant === 'color' ? "#005CB9" : "#FFFFFF"} />
          </g>
          {variant === 'color' && (
             <path d="M35 18 C 25 18 18 25 18 35 L 18 65 C 18 74 25 82 35 82 L 65 82 C 74 82 82 74 82 65 L 82 35 C 82 25 74 18 65 18 Z" 
                   fill="none" stroke="#FFD100" strokeWidth="4" className="hidden" />
          )}
        </svg>
        {withLoadingAnimation && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"></div>
            <Loader className={`animate-spin h-1/2 w-1/2 ${loaderColor}`} />
          </div>
        )}
      </div>
      
      <div className="flex flex-col justify-center leading-none">
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium mb-[1px]" style={{ color: variant === 'color' ? '#E60012' : '#FFFFFF' }}>
          Farmácia do
        </span>
        <span className={`text-xl md:text-2xl font-extrabold tracking-tight -ml-[1px] transition-colors duration-300 ease-in-out ${variant === 'color' ? 'text-brand-red group-hover:text-brand-yellow' : 'text-white'}`}>
          Trabalhador
        </span>
        <span className="text-[10px] font-bold uppercase bg-clip-text tracking-widest mt-[1px]" style={{ color: textColorSecondary }}>
          Vale do Aço
        </span>
      </div>
    </div>
  );
};

const Header = memo(({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (v: boolean) => void }) => {
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-brand-red text-white text-xs py-1.5 text-center font-bold px-4 tracking-wide">
        🚀 Entregamos num raio de 10km! Peça no Zap: (31) 99781-2767
      </div>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="cursor-pointer group" onClick={() => scrollToSection('home')}>
          <BrandLogo className="h-12 md:h-14" withLoadingAnimation={true} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <button onClick={() => scrollToSection('home')} className="hover:text-brand-red transition-colors">Início</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-brand-red transition-colors">Quem Somos</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-brand-red transition-colors">Serviços</button>
          <button onClick={() => scrollToSection('upload')} className="hover:text-brand-red transition-colors flex items-center gap-1">
             Enviar Receita
          </button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-brand-red transition-colors">Contato</button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/farmaciadotrabalhador_oficial" target="_blank" rel="noopener noreferrer" title="Siga-nos no Instagram" className="hidden md:block text-gray-500 hover:text-brand-red transition-colors">
              <Instagram size={24} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61565382111600" target="_blank" rel="noopener noreferrer" title="Siga-nos no Facebook" className="hidden md:block text-gray-500 hover:text-brand-red transition-colors">
              <Facebook size={24} />
          </a>
          <button 
            onClick={() => openWhatsApp("Olá, gostaria de fazer um pedido.")}
            className="hidden md:flex bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold items-center gap-2 transition-colors shadow-sm"
          >
            <MessageSquare size={18} />
            Pedir no Zap
          </button>
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg absolute w-full z-40">
          <button onClick={() => scrollToSection('home')} className="text-left font-medium py-2 border-b">Início</button>
          <button onClick={() => scrollToSection('about')} className="text-left font-medium py-2 border-b">Quem Somos</button>
          <button onClick={() => scrollToSection('services')} className="text-left font-medium py-2 border-b">Serviços</button>
          <button onClick={() => scrollToSection('upload')} className="text-left font-medium py-2 border-b text-brand-red">Enviar Receita</button>
          <button onClick={() => scrollToSection('contact')} className="text-left font-medium py-2">Contato</button>
        </div>
      )}
    </header>
  );
});

const Footer = memo(() => (
  <footer className="bg-brand-dark text-white pt-12 pb-6 border-t-4 border-brand-red">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <div className="mb-6 group bg-white p-4 rounded-xl inline-block shadow-md">
          <BrandLogo variant="color" className="h-12" />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          Farmácia do Trabalhador Vale do Aço. 
          Variedade em medicamentos, perfumaria e serviços farmacêuticos com entrega rápida.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-brand-yellow">Contato Rápido</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li className="flex items-center gap-2"><Phone size={16} /> (31) 99781-2767</li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-white" onClick={() => openWhatsApp()}>
            <MessageSquare size={16} /> (31) 99781-2767
          </li>
          <li className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0" /> 
            <span>Av. Luiza Maria Nascimbene, 846<br/>Vila Celeste, Ipatinga - MG</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-brand-yellow">Horário de Funcionamento</h4>
        <div className="space-y-2">
          <p className="text-sm text-gray-400 flex justify-between max-w-[200px]"><span>Seg - Sex:</span> <span className="text-white">08:00 - 21:00</span></p>
          <p className="text-sm text-gray-400 flex justify-between max-w-[200px]"><span>Sábado:</span> <span className="text-white">08:00 - 20:00</span></p>
          <p className="text-sm text-gray-400 flex justify-between max-w-[200px]"><span>Domingo:</span> <span className="text-white">08:00 - 13:00</span></p>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-brand-yellow">Nossas Redes</h4>
        <div className="flex items-center gap-4">
             <a href="https://www.instagram.com/farmaciadotrabalhador_oficial" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={28} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61565382111600" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={28} />
            </a>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-xs text-gray-500 text-center">
      <p>&copy; {new Date().getFullYear()} Farmácia do Trabalhador Ipatinga. Todos os direitos reservados.</p>
      <p className="hidden md:block">|</p>
      <p>
        Desenvolvido por <a href="https://esgrmkt.com.br" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-400 hover:text-white transition-colors">ESGR MKT</a>
      </p>
    </div>
  </footer>
));

// --- Sections ---

const HeroSection = memo(() => (
  <section id="home" className="relative py-20 lg:py-32 bg-brand-red text-white overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=75&w=1400" 
        alt=""
        role="presentation"
        aria-hidden="true"
        className="w-full h-full object-cover opacity-10 mix-blend-multiply"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-brand-red/95 to-brand-red/80"></div>
    </div>
    
    <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-8 animate-in slide-in-from-left duration-700 fade-in">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-brand-yellow font-bold text-sm uppercase tracking-wider border border-white/10">
          <Star size={16} fill="currentColor" /> Farmácia em Ipatinga
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Sua saúde em <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white">primeiro lugar.</span>
        </h1>
        
        <p className="text-xl text-white/90 max-w-lg font-light leading-relaxed">
          Medicamentos, perfumaria, higiene e serviços farmacêuticos com o melhor atendimento da Vila Celeste.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            onClick={() => openWhatsApp("Olá, gostaria de consultar um preço.")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-green-900/20"
          >
            <MessageSquare size={24} />
            Pedir no WhatsApp
          </button>
          <button 
            onClick={() => { document.getElementById('upload')?.scrollIntoView({behavior: 'smooth'}) }}
            className="bg-white text-brand-red hover:bg-gray-100 border border-transparent px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Upload size={24} /> Enviar Receita
          </button>
        </div>

        <div className="flex gap-6 pt-4 text-sm font-medium text-white/80">
          <div className="flex items-center gap-2"><Truck size={18} /> Entrega (Raio 10km)</div>
          <div className="flex items-center gap-2"><ShieldCheck size={18} /> Atendimento Humanizado</div>
        </div>
      </div>

      <div className="flex-1 relative hidden md:block">
         {/* Decorative Image Container */}
         <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=600" 
              alt="Pharmacist" 
              className="rounded-2xl w-full h-[400px] object-cover"
              width="600"
              height="400"
              fetchPriority="high"
            />
            <div className="absolute -bottom-6 -left-6 bg-brand-blue text-white p-6 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs">
              <div className="bg-white/20 p-3 rounded-full">
                <Clock size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">Aberto Todos os Dias</p>
                <p className="text-sm opacity-90">Até às 21:00 (Seg-Sex)</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  </section>
));

const CategoriesSection = memo(() => (
  <section id="services" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">O que você encontra aqui</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Além de medicamentos, oferecemos uma linha completa para o seu cuidado diário.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { icon: <Heart size={32} />, title: "Saúde e Beleza", color: "bg-pink-100 text-pink-600" },
          { icon: <Sparkles size={32} />, title: "Perfumaria", color: "bg-purple-100 text-purple-600" },
          { icon: <Smile size={32} />, title: "Higiene Pessoal", color: "bg-blue-100 text-blue-600" },
          { icon: <Baby size={32} />, title: "Fraldas Inf/Adulto", color: "bg-yellow-100 text-yellow-600" },
          { icon: <Stethoscope size={32} />, title: "Serviços Farmacêuticos", color: "bg-green-100 text-green-600" },
        ].map((cat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center gap-4 group">
            <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <h3 className="font-bold text-gray-800">{cat.title}</h3>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-red/10 p-4 rounded-full text-brand-red">
            <Truck size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Entrega Rápida</h3>
            <p className="text-gray-600">Cobrimos um raio de 10km na região.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-brand-blue/10 p-4 rounded-full text-brand-blue">
            <ShoppingBag size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Variedade de Produtos</h3>
            <p className="text-gray-600">Marcas renomadas e genéricos de confiança.</p>
          </div>
        </div>
        <button 
           onClick={() => openWhatsApp("Olá, gostaria de saber se entregam no meu bairro.")}
           className="bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          Consultar Entrega
        </button>
      </div>
    </div>
  </section>
));

const AboutSection = memo(() => (
  <section id="about" className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-yellow/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-blue/20 rounded-full blur-xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800" 
            alt="Nossa Farmácia" 
            className="relative rounded-3xl shadow-lg border border-gray-100 z-10 w-full object-cover h-[500px]"
            loading="lazy"
            width="800"
            height="500"
          />
        </div>
        <div className="order-1 md:order-2">
          <span className="text-brand-blue font-bold tracking-wider uppercase text-sm mb-2 block">Quem Somos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Farmácia do Trabalhador <br/>
            <span className="text-brand-red">Vale do Aço</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Localizada na Vila Celeste, somos referência em atendimento e variedade.
            Nossa missão é facilitar o acesso à saúde, oferecendo medicamentos de qualidade 
            com preços que cabem no bolso do trabalhador.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-1 rounded-full"><CheckCircle size={20} /></div>
              <span className="font-medium text-gray-700">Farmacêuticos sempre presentes</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-1 rounded-full"><CheckCircle size={20} /></div>
              <span className="font-medium text-gray-700">Grande estoque de fraldas e higiene</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-1 rounded-full"><CheckCircle size={20} /></div>
              <span className="font-medium text-gray-700">Bom atendimento garantido</span>
            </li>
          </ul>
          <button 
             onClick={() => openWhatsApp("Olá, gostaria de saber mais sobre a farmácia.")}
             className="text-brand-blue font-bold flex items-center gap-2 hover:gap-4 transition-all"
          >
            Fale com um atendente <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  </section>
));

const UploadSection = memo(() => {
  const [name, setName] = useState('');

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá, meu nome é *${name}* e gostaria de enviar uma foto da minha receita para orçamento.`;
    openWhatsApp(message);
  };

  return (
    <section id="upload" className="py-20 bg-brand-blue/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-brand-blue p-12 text-white flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                <Upload size={200} />
             </div>
             <h3 className="text-3xl font-bold mb-4 relative z-10">Envie sua Receita</h3>
             <p className="mb-8 text-blue-100 relative z-10">
               Não perca tempo na fila. Envie a foto da sua receita pelo WhatsApp e receba seu orçamento na hora.
             </p>
             <div className="space-y-4 relative z-10">
               <div className="flex items-center gap-3">
                 <div className="bg-white/20 p-2 rounded-lg font-bold">1</div>
                 <p className="text-sm">Preencha seu nome</p>
               </div>
               <div className="flex items-center gap-3">
                 <div className="bg-white/20 p-2 rounded-lg font-bold">2</div>
                 <p className="text-sm">Clique em "Continuar no WhatsApp"</p>
               </div>
               <div className="flex items-center gap-3">
                 <div className="bg-white/20 p-2 rounded-lg font-bold">3</div>
                 <p className="text-sm">Anexe a foto da receita na conversa</p>
               </div>
             </div>
          </div>
          
          <div className="md:w-1/2 p-12 flex flex-col justify-center">
            <form onSubmit={handleWhatsAppRedirect} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Seu Nome</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Maria da Silva" 
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none transition-all" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare size={20} />
                Continuar no WhatsApp
              </button>
              <p className="text-xs text-center text-gray-400">
                Ao clicar, você será redirecionado para o WhatsApp da Farmácia.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

const TestimonialSection = memo(() => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">O que dizem nossos clientes</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map(t => (
          <div key={t.id} className="bg-gray-50 p-8 rounded-2xl relative hover:-translate-y-1 transition-transform duration-300">
            <div className="text-brand-yellow mb-4 flex justify-center">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <p className="text-gray-600 italic mb-6">"{t.text}"</p>
            <div>
              <h4 className="font-bold text-gray-900">{t.name}</h4>
              <span className="text-xs text-brand-blue font-semibold uppercase tracking-wide">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

const ContactSection = memo(() => (
  <section id="contact" className="py-20 bg-brand-dark text-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Visite nossa loja na Vila Celeste ou chame no WhatsApp. Estamos prontos para te atender.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-brand-red/50 transition-colors text-center group">
          <div className="bg-brand-red/10 text-brand-red w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
            <Phone size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Telefone</h3>
          <p className="text-gray-400">(31) 99781-2767</p>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors text-center group cursor-pointer" onClick={() => openWhatsApp()}>
          <div className="bg-green-500/10 text-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
            <MessageSquare size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
          <p className="text-gray-400">(31) 99781-2767</p>
          <span className="text-xs text-green-500 mt-2 block font-bold">CLIQUE PARA CHAMAR</span>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-brand-blue/50 transition-colors text-center group">
          <div className="bg-brand-blue/10 text-brand-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
            <MapPin size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Endereço</h3>
          <p className="text-gray-400">Av. Luiza Maria Nascimbene, 846</p>
          <p className="text-gray-400">Vila Celeste, Ipatinga - MG</p>
        </div>
      </div>
    </div>
  </section>
));

const LocationMapSection = memo(() => {
  const address = "Av. Luiza Maria Nascimbene, 846 - Vila Celeste, Ipatinga - MG";
  const mapQuery = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Localização</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos te esperando na Vila Celeste. Venha nos visitar!
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 max-w-5xl mx-auto">
          <iframe
            className="w-full h-96 rounded-2xl"
            src={mapUrl}
            loading="lazy"
            title="Mapa da Farmácia do Trabalhador"
            allowFullScreen={false}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        <div className="text-center mt-8">
            <a 
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-brand-blue hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20"
            >
              <Navigation size={22} />
              Como Chegar
            </a>
        </div>
      </div>
    </section>
  )
});


// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <CategoriesSection />
        <UploadSection />
        <TestimonialSection />
        <ContactSection />
        <LocationMapSection />
      </main>

      <Footer />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* WhatsApp Floating Button (Most Prominent) */}
        <button 
          onClick={() => openWhatsApp()}
          className="bg-green-500 text-white p-4 rounded-full shadow-xl shadow-green-900/20 hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center border-2 border-white animate-bounce-slow"
          title="Chamar no WhatsApp"
        >
          <MessageSquare size={28} fill="white" />
        </button>
      </div>
    </div>
  );
}