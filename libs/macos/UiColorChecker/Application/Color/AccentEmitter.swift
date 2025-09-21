//
//  AccentEmitter.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

import Domain
import Foundation

extension Color {

  public class AccentEmitter: Output.Emitter {

    private static let checkingInterval = 0.5  // Seconds

    private let notifier: Color.AccentNotifier
    private let colorConfig: Color.ColorConfig
    private let colorSystem: Color.ColorSystem

    private var accentColor: String??
    private var isMulticolor: Bool?

    public init(
      notifier:Color.AccentNotifier, colorConfig:ColorConfig, colorSystem:ColorSystem,
    ) {
      self.notifier = notifier
      self.colorConfig = colorConfig
      self.colorSystem = colorSystem
      self.setAccentObserver()
    }

    private func setAccentObserver() {
      Timer.scheduledTimer( withTimeInterval:Self.checkingInterval, repeats:true ) { _ in
        self.forceChecking()
      }
    }

    /// Handles periodic checking of the color config
    public func forceChecking() {
      let accentColor: String? = self.colorSystem.accent
      let isMulticolor: Bool = self.colorConfig.isMulticolor
      if ( accentColor != self.accentColor ) || ( isMulticolor != self.isMulticolor ) {
        self.accentColor = accentColor
        self.isMulticolor = isMulticolor
        let event = Domain.Color.ColorEvent( isMulticolor:isMulticolor, code:accentColor )
        self.notifier.dispatch( event:event )
      }
    }

    public func addObserver( handle:@escaping ( Domain.Color.ColorEvent ) -> Void ) {
      self.notifier.addObserver( handle:handle )
    }

  }

}
