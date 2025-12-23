import React, { useState, useRef, useEffect, memo } from 'react';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Upload, 
  MessageSquare, 
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
  Facebook,
  Syringe,
  Puzzle,
  Droplet,
  Leaf,
  Palette,
  Pill,
  NotebookPen,
  Gem,
  Ear,
  Laptop,
  PaintBucket,
  Activity,
  Wallet,
  UserCheck,
  Percent,
  Layers,
  HeartPulse,
  Thermometer,
  ZoomIn,
  Download
} from 'lucide-react';
import { Testimonial } from './types';
import { TESTIMONIALS, WHATSAPP_NUMBER } from './constants';


// --- Helpers ---

const openWhatsApp = (message: string = "") => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

const OFFICIAL_LOGO_URL = "https://kjunynajewbtxqojxbok.supabase.co/storage/v1/object/public/FARMACIA%20DO%20TRABALHADOR/LOGO%20-%20Michael%20Michael.avif";
const STOREFRONT_IMAGE_URL = "https://kjunynajewbtxqojxbok.supabase.co/storage/v1/object/public/FARMACIA%20DO%20TRABALHADOR/Fachada%20da%20Loja.avif";
const OFFER_IMAGE_1 = "https://kjunynajewbtxqojxbok.supabase.co/storage/v1/object/public/FARMACIA%20DO%20TRABALHADOR/PRECOS1.avif";
const OFFER_IMAGE_2 = "https://kjunynajewbtxqojxbok.supabase.co/storage/v1/object/public/FARMACIA%20DO%20TRABALHADOR/PRECO2.avif";


// --- Components Helpers ---

interface FadeInProps {
  children?: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  className?: string;
  fullWidth?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = "",
  fullWidth = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "50px" });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up': return 'translate-y-12';
      case 'down': return '-translate-y-12';
      case 'left': return '-translate-x-12';
      case 'right': return 'translate-x-12';
      default: return '';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${fullWidth ? 'w-full' : ''} ${className}
        ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getDirectionClasses()}`}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Sub-Components ---

const BrandLogo = ({ 
  className = "h-12",
  withLoadingAnimation = false 
}: { 
  className?: string,
  withLoadingAnimation?: boolean 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-full relative flex items-center">
        {/* Imagem Oficial da Logomarca */}
        <img 
          src={OFFICIAL_LOGO_URL}
          alt="Logo Farmácia do Trabalhador"
          className="h-full w-auto object-contain rounded-md shadow-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_4px_15px_rgba(230,0,18,0.4)]"
          fetchPriority="high"
        />
        {withLoadingAnimation && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] rounded-md"></div>
            <Loader className="animate-spin h-1/2 w-1/2 text-brand-red" />
          </div>
        )}
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
        🚀 Entrega Rápida! Peça no Zap: (31) 99781-2767
      </div>
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="cursor-pointer group h-16 md:h-20 lg:h-24" onClick={() => scrollToSection('home')}>
          <BrandLogo className="h-full" withLoadingAnimation={true} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <button onClick={() => scrollToSection('home')} className="hover:text-brand-red transition-colors">Início</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-brand-red transition-colors">Quem Somos</button>
          <button onClick={() => scrollToSection('deals')} className="hover:text-brand-red transition-colors text-brand-red font-bold">Ofertas</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-brand-red transition-colors">Produtos</button>
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
          <button onClick={() => scrollToSection('deals')} className="text-left font-medium py-2 border-b text-brand-red">Ofertas</button>
          <button onClick={() => scrollToSection('services')} className="text-left font-medium py-2 border-b">Produtos</button>
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
          <BrandLogo className="h-20 md:h-28" />
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
        src={STOREFRONT_IMAGE_URL}
        alt="Fachada da Farmácia do Trabalhador"
        role="presentation"
        aria-hidden="true"
        className="w-full h-full object-cover opacity-20 mix-blend-multiply"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-brand-red/90 to-brand-red/70"></div>
    </div>
    
    <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-8">
        <FadeIn direction="left" delay={100}>
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-brand-yellow font-bold text-sm uppercase tracking-wider border border-white/10">
            <Star size={16} fill="currentColor" /> Farmácia em Ipatinga
          </div>
        </FadeIn>
        
        <FadeIn direction="left" delay={300}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight shadow-black drop-shadow-lg">
            Você Encontra Tudo Para <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white">Sua Saúde e Bem-Estar.</span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="left" delay={500}>
          <p className="text-lg md:text-xl text-white/90 max-w-lg font-light leading-relaxed">
            Entrega Rápida, Segura e com o Melhor Atendimento da Região! Peça agora mesmo no conforto da sua casa por Whatsapp, ligação ou saiba como chegar.
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={700}>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => openWhatsApp("Olá, gostaria de consultar um preço.")}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-green-900/20"
            >
              <MessageSquare size={24} />
              Pedir no WhatsApp
            </button>
            <button 
              onClick={() => { document.getElementById('location')?.scrollIntoView({behavior: 'smooth'}) }}
              className="bg-white text-brand-red hover:bg-gray-100 border border-transparent px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MapPin size={24} /> Como Chegar
            </button>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={900}>
          <div className="flex gap-6 pt-4 text-sm font-medium text-white/80">
            <div className="flex items-center gap-2"><Truck size={18} /> Entrega Rápida</div>
            <div className="flex items-center gap-2"><ShieldCheck size={18} /> Segurança Garantida</div>
          </div>
        </FadeIn>
      </div>

      <div className="flex-1 relative hidden md:block">
         {/* Decorative Image Container - Showing the actual store photo or reliable stock */}
         <FadeIn direction="right" delay={600}>
           <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src={STOREFRONT_IMAGE_URL} 
                alt="Fachada da Farmácia do Trabalhador" 
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
         </FadeIn>
      </div>
    </div>
  </section>
));

const DealsSection = memo(() => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const toggleImage = (img: string) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <section id="deals" className="py-20 bg-gradient-to-b from-brand-red/5 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <FadeIn direction="down">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="text-brand-yellow" fill="currentColor" />
              Preços Imbatíveis
              <Sparkles className="text-brand-yellow" fill="currentColor" />
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira nossas ofertas especiais da semana. <br/>
              <span className="text-sm font-semibold text-brand-red flex items-center justify-center gap-1 mt-1">
                <ZoomIn size={16} /> Clique nas imagens para ampliar e ver os preços
              </span>
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[OFFER_IMAGE_1, OFFER_IMAGE_2].map((img, index) => (
            <FadeIn key={index} direction={index === 0 ? "right" : "left"} delay={100 + (index * 200)}>
              <div 
                className="group relative bg-white p-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-zoom-in border border-gray-100"
                onClick={() => toggleImage(img)}
              >
                 <div className="rounded-xl overflow-hidden relative">
                   <img
                     src={img}
                     alt={`Oferta Especial ${index + 1}`}
                     className="w-full h-auto object-contain bg-gray-100"
                   />
                   {/* Hover Overlay */}
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 text-gray-900 px-4 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ZoomIn size={20} /> Ampliar Oferta
                      </div>
                   </div>
                 </div>
                 <div className="mt-3 flex justify-between items-center px-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Oferta {index + 1}</span>
                    <button className="text-brand-blue hover:text-brand-red transition-colors" title="Ampliar">
                      <ZoomIn size={20} />
                    </button>
                 </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
           <FadeIn direction="up" delay={500}>
              <button
                onClick={() => openWhatsApp("Olá, vi as promoções no site e gostaria de fazer um pedido.")}
                className="bg-brand-red text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 inline-flex items-center gap-2 animate-pulse"
              >
                <ShoppingBag size={20} />
                Aproveitar Ofertas Agora
              </button>
           </FadeIn>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={closeImage}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button 
              onClick={closeImage}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors bg-white/10 p-2 rounded-full"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage} 
              alt="Oferta Ampliada" 
              className="w-auto h-auto max-w-full max-h-[85vh] rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300 object-contain"
              onClick={(e) => e.stopPropagation()} 
            />
            <a 
              href={selectedImage} 
              download 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-white text-gray-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={18} /> Baixar Imagem
            </a>
          </div>
        </div>
      )}
    </section>
  );
});

const CategoriesSection = memo(() => {
  const highlights = [
    {
      icon: <UserCheck size={32} />,
      title: "Farmacêuticos Presentes",
      desc: "Orientação profissional qualificada sempre à sua disposição."
    },
    {
      icon: <Layers size={32} />,
      title: "Amplo Estoque",
      desc: "Medicamentos de Referência, Similares e Éticos sempre disponíveis."
    },
    {
      icon: <Percent size={32} />,
      title: "Genéricos c/ Desconto",
      desc: "Economia garantida com até 90% de desconto em genéricos."
    },
    {
      icon: <Baby size={32} />,
      title: "Grande Variedade",
      desc: "Estoque completo de fraldas, tinturas e perfumaria para você."
    }
  ];

  const categories = [
    { icon: <Syringe size={28} />, title: "Aplicação de Injetáveis", color: "text-blue-600 bg-blue-100" },
    { icon: <Ear size={28} />, title: "Limpeza de Ouvido", color: "text-amber-600 bg-amber-100" },
    { icon: <HeartPulse size={28} />, title: "Aferição de Pressão", color: "text-red-600 bg-red-100" },
    { icon: <Droplet size={28} />, title: "Teste de Glicemia", color: "text-red-500 bg-red-50" },
    { icon: <Pill size={28} />, title: "Medicamentos", color: "text-brand-red bg-red-100" },
    { icon: <Sparkles size={28} />, title: "Beleza e Estética", color: "text-pink-600 bg-pink-100" },
    { icon: <Puzzle size={28} />, title: "Brinquedos", color: "text-purple-600 bg-purple-100" },
    { icon: <Leaf size={28} />, title: "Fitoterápicos", color: "text-green-600 bg-green-100" },
    { icon: <Smile size={28} />, title: "Higiene Pessoal", color: "text-teal-600 bg-teal-100" },
    { icon: <Baby size={28} />, title: "Mamãe e Bebê", color: "text-yellow-600 bg-yellow-100" },
    { icon: <Palette size={28} />, title: "Maquiagem", color: "text-rose-600 bg-rose-100" },
    { icon: <NotebookPen size={28} />, title: "Papelaria", color: "text-orange-600 bg-orange-100" },
    { icon: <Gem size={28} />, title: "Perfumes Importados", color: "text-indigo-600 bg-indigo-100" },
    { icon: <Laptop size={28} />, title: "Eletrônicos", color: "text-slate-700 bg-slate-200" },
    { icon: <PaintBucket size={28} />, title: "Tinturas", color: "text-fuchsia-600 bg-fuchsia-100" },
    { icon: <Activity size={28} />, title: "Vitaminas", color: "text-lime-600 bg-lime-100" },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Highlights Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlights.map((item, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 100}>
              <div className="bg-white h-full p-6 rounded-2xl shadow-sm border-l-4 border-brand-red hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="bg-brand-red/10 text-brand-red w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="text-center mb-12">
          <FadeIn direction="down">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">O que você encontra aqui</h2>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Serviços farmacêuticos especializados e uma linha completa de produtos.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <FadeIn key={idx} direction="up" delay={100 + (idx % 4) * 50}>
              <div className="bg-white h-full p-5 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center gap-3 group cursor-default">
                <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{cat.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <FadeIn direction="up" delay={400}>
            <button 
               onClick={() => openWhatsApp("Olá, gostaria de saber se vocês têm um produto específico.")}
               className="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/10 inline-flex items-center gap-2"
            >
              <MessageSquare size={20} />
              Consultar Disponibilidade
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
});

const AboutSection = memo(() => (
  <section id="about" className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 relative">
          <FadeIn direction="right">
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
          </FadeIn>
        </div>
        <div className="order-1 md:order-2">
          <FadeIn direction="left" delay={200}>
            <span className="text-brand-blue font-bold tracking-wider uppercase text-sm mb-2 block">Quem Somos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Farmácia do Trabalhador <br/>
              <span className="text-brand-red">Vale do Aço</span>
            </h2>
          </FadeIn>
          
          <FadeIn direction="left" delay={300}>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Localizada no <strong>coração do bairro Vila Celeste</strong>, somos referência em atendimento e variedade.
            </p>
          </FadeIn>
          
          <FadeIn direction="left" delay={400}>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Nossa missão é facilitar o acesso à saúde, oferecendo medicamentos de qualidade com <strong>preços que cabem no bolso</strong>.
            </p>
          </FadeIn>
          
          <div className="space-y-4 mb-8">
            <FadeIn direction="left" delay={500}>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-600 p-1 rounded-full"><CheckCircle size={20} /></div>
                <span className="font-medium text-gray-700">Equipe qualificada sempre presente</span>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={600}>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-600 p-1 rounded-full"><CheckCircle size={20} /></div>
                <span className="font-medium text-gray-700">Mix completo de produtos</span>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={700}>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-600 p-1 rounded-full"><CheckCircle size={20} /></div>
                <span className="font-medium text-gray-700">Atendimento humanizado</span>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn direction="up" delay={800}>
            <button 
               onClick={() => openWhatsApp("Olá, gostaria de saber mais sobre a farmácia.")}
               className="text-brand-blue font-bold flex items-center gap-2 hover:gap-4 transition-all"
            >
              Fale com um atendente <ChevronRight size={20} />
            </button>
          </FadeIn>
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
        <FadeIn direction="up">
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
        </FadeIn>
      </div>
    </section>
  );
});

const TestimonialSection = memo(() => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <FadeIn direction="down">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">O que dizem nossos clientes</h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <FadeIn key={t.id} direction="up" delay={idx * 150}>
            <div className="bg-gray-50 p-8 rounded-2xl relative hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="text-brand-yellow mb-4 flex justify-center">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic mb-6">"{t.text}"</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{t.name}</h4>
                <span className="text-xs text-brand-blue font-semibold uppercase tracking-wide">{t.role}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
));

const ContactSection = memo(() => (
  <section id="contact" className="py-20 bg-brand-dark text-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <FadeIn direction="down">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
        </FadeIn>
        <FadeIn direction="up" delay={200}>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visite nossa loja na Vila Celeste ou chame no WhatsApp. Estamos prontos para te atender.
          </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FadeIn direction="left" delay={0}>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-brand-red/50 transition-colors text-center group h-full">
            <div className="bg-brand-red/10 text-brand-red w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Telefone</h3>
            <p className="text-gray-400">(31) 99781-2767</p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={200}>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors text-center group cursor-pointer h-full" onClick={() => openWhatsApp()}>
            <div className="bg-green-500/10 text-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
            <p className="text-gray-400">(31) 99781-2767</p>
            <span className="text-xs text-green-500 mt-2 block font-bold">CLIQUE PARA CHAMAR</span>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={400}>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-brand-blue/50 transition-colors text-center group h-full">
            <div className="bg-brand-blue/10 text-brand-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <MapPin size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Endereço</h3>
            <p className="text-gray-400">Av. Luiza Maria Nascimbene, 846</p>
            <p className="text-gray-400">Vila Celeste, Ipatinga - MG</p>
          </div>
        </FadeIn>
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
          <FadeIn direction="down">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Localização</h2>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estamos te esperando na Vila Celeste. Venha nos visitar!
            </p>
          </FadeIn>
        </div>
        
        <FadeIn direction="up" delay={300}>
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
        </FadeIn>
        
        <div className="text-center mt-8">
            <FadeIn direction="up" delay={500}>
              <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-brand-blue hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20"
              >
                <Navigation size={22} />
                Como Chegar
              </a>
            </FadeIn>
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
        <DealsSection />
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