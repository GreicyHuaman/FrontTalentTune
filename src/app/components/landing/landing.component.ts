import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatExpansionModule,
    MatCardModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  faqs = [
    {
      question: '¿Qué es Talent Tune?',
      answer: 'Somos una plataforma web y móvil que se centra en el ámbito musical, específicamente en conectar a personas interesadas en el mundo de la música, ya sean músicos que buscan unirse a una banda o artistas en busca de managers, con los profesionales adecuados para ayudarlos a alcanzar sus objetivos en la industria musical.',
    },
    {
      question: '¿Cómo funciona la aplicación Talent Tune?',
      answer: 'El propósito se basa en proporcionar una plataforma para la interacción y colaboración en el ámbito musical. La aplicación utiliza algoritmos y sistemas inteligentes para identificar perfiles relacionados y sugerir conexiones entre los usuarios. Además, facilita la comunicación entre los usuarios para que puedan colaborar, conversar y coordinar proyectos musicales.',
    },
    {
      question: '¿Está disponible la aplicación en mi ciudad/país?',
      answer: 'Talent Tune esta disponible solo para Peru-Lima; pero pronto estaremos en nuevos sitios.',
    },
    {
      question: '¿La aplicación tiene algún costo?',
      answer: 'Puesto que recien estamos empezando, hemos decidido que la aplicacion de a los artistas apoyo por medio de los managers y seguidores.',
    },
    {
      question: '¿Que tipos de servicios ofrece la aplicacion Talent Tune?',
      answer: 'Talent Tune ofrece diferentes servicios para nuestros 3 públicos objetivos como manager, artistas y seguidores, como son la conexión entre músicos y personas relacionadas con la industria musical, la gestión de eventos por medio de los sponsors, el descubrimiento de nuevos artistas y la calificarción y reseñas a los artistas y profesionales de la industria musical, lo que ayuda a establecer la reputación y calidad de los servicios ofrecidos.',
    },
    {
      question: '¿Es seguro usar la aplicacion Talent Tune?',
      answer: 'Si es segura, dado que contamos con la autenticacion de Spring Security de tal forma de que todos los datos de nuestros usuarios esten cifrados.',
    },
    {
      question: '¿Se puede cambiar el tipo de cuenta una vez que ya la cree?',
      answer: 'No. Una vez creada la cuenta, si usted desea cambiar el tipo, primero debe eliminar la cuenta.',
    },
  ]
}
