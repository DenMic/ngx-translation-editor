import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  computed,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettingsService } from '../../../module/service/app-settings.service';

@Component({
  selector: 'edt-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './edt-dropdown.component.html',
  styleUrl: './edt-dropdown.component.css',
})
export class EdtDropdownComponent implements OnDestroy {
  private overlay: Overlay = inject(Overlay);
  private vcr: ViewContainerRef = inject(ViewContainerRef);
  protected readonly appSettingsService = inject(AppSettingsService);

  templateRef = viewChild.required<TemplateRef<any>>('templateRef');

  title = input<string>();
  showTitle = input<boolean>(false);

  onClose = output();

  private overlayRef?: OverlayRef;
  private subscriptions: Subscription[] = [];

  protected cssClass = computed(() => {
    let baseCss = `flex-col justify-start items-start inline-flex overflow-hidden
    min-w[144px] mt-1
    rounded-md shadow dark:shadow-none
    text-neutral-800 dark:text-neutral-200
    bg-neutral-100 dark:bg-base-700`;

    if (this.appSettingsService.darkTheme()) {
      baseCss += ' dark';
    }

    return baseCss;
  });

  public show(target: HTMLElement) {
    if (this.overlayRef?.hasAttached()) {
      this.close();
      return;
    }

    if (!target) {
      debugger;
      return;
    }
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(target)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]);

    // Create and configure overlay
    this.overlayRef = this.overlay.create({
      // Position strategy defines where popup will be displayed
      positionStrategy: positionStrategy,

      // Popup reposition on scroll
      scrollStrategy: this.overlay.scrollStrategies.reposition(),

      // Display backdrop
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    // Put template to a portal
    const periodSelectorPortal = new TemplatePortal(
      this.templateRef(),
      this.vcr
    );

    // Attach the portal to the overlay
    this.overlayRef.attach(periodSelectorPortal);

    this.subscriptions.push(
      this.overlayRef.backdropClick().subscribe(() => {
        this.close();
      })
    );
    this.subscriptions.push(
      this.overlayRef.detachments().subscribe(() => {
        this.close();
      })
    );
  }

  public close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
      this.onClose.emit();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
  }
}
